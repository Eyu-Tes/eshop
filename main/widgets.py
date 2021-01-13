from django.forms.widgets import Widget


class PlusMinusNumberInput(Widget):
    template_name = "widgets/plusminusnumber.html"

    class Media:
        css = {"all": ("widgets/css/plusminusnumber.css",)}
        js = ("widgets/js/plusminusnumber.js",)
