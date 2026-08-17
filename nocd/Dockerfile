# syntax=docker/dockerfile:1
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DEBUG=false

WORKDIR /app

# Torch (CPU wheel) dipasang terpisah supaya lapisan build bisa di-cache
RUN pip install --no-cache-dir torch==2.9.1 --index-url https://download.pytorch.org/whl/cpu

# Runtime dependencies
COPY requirements-prod.txt .
RUN pip install --no-cache-dir -r requirements-prod.txt

# Kode aplikasi
COPY . .

EXPOSE 8000

# collectstatic saat boot, lalu jalankan gunicorn
# Tidak ada migrate karena tidak pakai database
CMD ["sh", "-c", "python manage.py collectstatic --noinput && gunicorn nocd.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 1 --threads 4 --timeout 120"]