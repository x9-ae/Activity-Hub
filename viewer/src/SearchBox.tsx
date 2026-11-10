import { useId, useRef, useState, type RefObject } from "react"
import type { Suggestion } from "./query"
import { Icon } from "./icons"
import { cx } from "./parts"

type Props = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  /** what can follow the word being typed */
  suggestions: (token: string) => Suggestion[]
  placeholder?: string
  inputRef?: RefObject<HTMLInputElement | null>
}

/** The word around the caret: where it starts and ends in the text. */
function wordAt(text: string, caret: number) {
  const start = text.lastIndexOf(" ", caret - 1) + 1
  const end = text.indexOf(" ", caret)
  return { start, end: end < 0 ? text.length : end, word: text.slice(start, end < 0 ? text.length : end) }
}

/** One box for the whole search, as the audit logs of GitHub and Pangea have it: fields and their
 * values are offered while typing; Enter searches. */
export function SearchBox({ value, onChange, onSubmit, suggestions, placeholder, inputRef }: Props) {
  const own = useRef<HTMLInputElement>(null)
  const input = inputRef ?? own
  const list = useId()
  const [caret, setCaret] = useState(0)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  // a suggestion is taken by Enter only once the person moved to it (arrows or the pointer)
  const [chosen, setChosen] = useState(false)
  const { start, end, word } = wordAt(value, caret)
  const options = open ? suggestions(word) : []
  const current = options[Math.min(active, options.length - 1)]

  const accept = (option: Suggestion) => {
    const after = value.slice(end)
    const spacer = option.insert.endsWith(":") ? "" : " "
    const next = `${value.slice(0, start)}${option.insert}${after.startsWith(" ") || !spacer ? "" : spacer}${after}`
    const position = start + option.insert.length + (option.insert.endsWith(":") ? 0 : 1)
    onChange(next)
    setActive(0)
    setChosen(false)
    requestAnimationFrame(() => {
      input.current?.focus()
      input.current?.setSelectionRange(position, position)
      setCaret(position)
    })
  }

  return (
    <div className="ahv-search">
      <span className="ahv-input-icon">
        <Icon name="search" size={14} />
        <input
          ref={input}
          className="ahv-input"
          role="combobox"
          aria-label="Search"
          aria-expanded={options.length > 0}
          aria-controls={list}
          aria-autocomplete="list"
          aria-activedescendant={options.length && chosen ? `${list}-${options.indexOf(current)}` : undefined}
          value={value}
          placeholder={placeholder}
          spellCheck={false}
          onChange={(e) => {
            onChange(e.target.value)
            setCaret(e.target.selectionStart ?? e.target.value.length)
            setOpen(true)
            setActive(0)
            setChosen(false)
          }}
          onSelect={(e) => {
            const at = e.currentTarget.selectionStart ?? 0
            if (wordAt(value, at).start !== start) setChosen(false)   // another word: nothing chosen in it
            setCaret(at)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => { setOpen(false); setChosen(false) }, 120)}
          onKeyDown={(e) => {
            if (options.length && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
              e.preventDefault()
              // the first press lands on the first option
              setActive((a) => (!chosen ? (e.key === "ArrowDown" ? 0 : options.length - 1) : (a + (e.key === "ArrowDown" ? 1 : options.length - 1)) % options.length))
              setChosen(true)
            } else if (options.length && chosen && e.key === "Enter") {
              e.preventDefault()
              accept(current)
            } else if (e.key === "Escape") {
              setOpen(false)
              setChosen(false)
            } else if (e.key === "Enter") {
              setOpen(false)
              onSubmit()
            }
          }}
        />
      </span>
      {options.length > 0 && (
        <ul id={list} role="listbox" className="ahv-suggest">
          {options.map((option, i) => (
            <li key={option.insert} id={`${list}-${i}`} role="option" aria-selected={chosen && option === current}
              className={cx(chosen && option === current && "ahv-suggest-on")}
              onMouseDown={(e) => { e.preventDefault(); accept(option) }} onMouseEnter={() => { setActive(i); setChosen(true) }}>
              <span className="ahv-mono">{option.label}</span>
              {option.hint && <span className="ahv-dim">{option.hint}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
