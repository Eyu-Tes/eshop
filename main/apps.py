from django.apps import AppConfig


class MainConfig(AppConfig):
    name = 'main'

    def ready(self):
        # initialize signal
        from . import signals
