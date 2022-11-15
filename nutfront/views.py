from django.shortcuts import render


def nutlist(request):
    return render(request, 'queue.html')
