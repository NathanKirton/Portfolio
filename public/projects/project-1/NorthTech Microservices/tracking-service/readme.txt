NorthTech Tracking Service

REQUIREMENTS
- Docker Desktop must be installed and running

QUICK START
1. Open PowerShell and navigate to the tracking-service folder
2. Run: docker-compose up --build
3. Open your browser and go to http://localhost:3001

USING THE WEB INTERFACE
- Create/Update Parcel: Enter tracking ID and status, then click "Save Parcel"
- Query Parcel: Enter tracking ID and click "Search Parcel"
- Publish Message: Enter tracking ID and status, then click "Publish to Queue"
- View All Parcels: Click "Load All Parcels" to see all tracked packages
- Service Metrics: Click "Refresh Metrics" to view system statistics

ADDITIONAL INFO
- RabbitMQ Management: http://localhost:15672 (username: guest, password: guest)
- Prometheus Metrics: http://localhost:3001/metrics
- MongoDB: Available on localhost:27017


