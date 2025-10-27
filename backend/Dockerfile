FROM python:3.11-slim

WORKDIR /app

# Install build deps and pip dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . /app

# Set a sensible default port for Cloud Run
ENV PORT=8080

# Use Gunicorn to serve the Flask app (Cloud Run expects the container to listen on $PORT)
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app", "--workers", "1", "--timeout", "3600"]
