from django.shortcuts import render

def index(request):
  number_list = range(1, 30)
  context = {
        'numbers': number_list,
    }

  return render(request, "index.html", context)
