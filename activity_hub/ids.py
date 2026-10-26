import os
import time
import uuid


def uuid7() -> str:
    """A time-ordered UUID (RFC 9562 version 7): 48-bit Unix milliseconds, then random bits."""
    milliseconds = time.time_ns() // 1_000_000
    random_bits = int.from_bytes(os.urandom(10), "big")
    value = (
        (milliseconds & (2**48 - 1)) << 80
        | 0x7 << 76
        | (random_bits >> 62 & 0xFFF) << 64
        | 0b10 << 62
        | random_bits & (2**62 - 1)
    )
    return str(uuid.UUID(int=value))
