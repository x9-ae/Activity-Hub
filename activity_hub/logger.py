import logging

# The package's one logger. The application decides where it goes by attaching its handlers to the
# "activity_hub" logger (logging.getLogger("activity_hub")); until then nothing is printed.
logger = logging.getLogger("activity_hub")
logger.addHandler(logging.NullHandler())
