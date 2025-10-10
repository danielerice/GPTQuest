"""
WSGI config for gptquest project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gptquest.settings')

application = get_wsgi_application()
