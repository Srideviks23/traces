# GRAFANA DOCUMENTATION FOR TRACES

## Introduction

This repository provides guidance and resources for setting up traces monitoring using Jaeger and Grafana in your distributed systems.

1. Set up your own NodeJs Microservice, by navigating to your microservices directory.
2. After the process of application set up completes, we will start with the docker compose file.
3. We have to use the necessary Docker images from Docker hub:
   -Grafana
   -Prometheus
   -Jaeger

If you want to use some other tracing system like zipkin instead of Jaeger, you have to add its image and configuration to the docker-compose file.

```bash
docker run -p 9411:9411 openzipkin/zipkin:latest
```

The above command pulls and runs Zipkin. You can always simply mention it as a service in docker-compose file and then build it.

=====================================================
we need to write an instrumentation file to instrument the application service to get traces.The instumentation file should exist in the same level of application file.Any modifications should be done on instrumentation file.

```bash
"node --require ./instrumentation.js index.js "
```

add the above code to "start" in package.json file

=====================================================
After mentioning all the requirements in docker-compose.yaml file and setting up instrumentation, execute the commands given below:

```bash
docker compose build
```

The docker compose build command is used to build or rebuild services defined in a docker-compose.yml file. When you run this command, Docker reads the service definitions that include build instructions from your Compose file and executes the build process for each service

```bash
docker compose up -d
```

This command will start

- Prometheus on port:9090 of your host system.
- Grafana on port:3000 of your host system.
- Jaeger on port:16686 of your host system.

## Prerequisites

- Docker installed on your local machine or server.
- Basic knowledge of Docker and Docker Compose.
- Access to the services you want to monitor with Jaeger.
- Basic understanding of Prometheus for metrics monitoring.

## Installation

Follow these steps to set up traces monitoring using Jaeger and Grafana:

1. Clone this repository:

```bash
git clone https://github.com/Srideviks23/traces.git
```

2. Navigate to the cloned repository directory:

```bash
cd <repository-directory>
```

3. Update the configuration files as needed.
   You can configure sampling rates, storage options, and other settings in the Jaeger and Prometheus configuration files.
   -> Change the IP-ADDRESS to Your IP-ADDRESS

### Getting Your IP Address

To find the IP address of your machine, you can run the following command in your terminal:

```bash
ipconfig
```

4.Start Jaeger, Grafana, and Prometheus using Docker Compose:

```bash
    docker-compose up -d
```

5.Access Jaeger UI by navigating to http://<your-ip-address>:16686 in your web browser.

To access Jaeger UI using Linux commands, you can use a command-line web browser like curl or wget. Here's how you can do it using curl:

```bash
curl http://<your-ip-address>:16686
```

This command will send an HTTP GET request to http://<your-ip-address>:16686 and display the HTML response in your terminal.

Alternatively, if you're using a headless server without a graphical environment, you won't be able to open Jaeger UI in a web browser. In that case, you can use curl to interact with the Jaeger API endpoints directly. For example, you can retrieve traces by sending a request to the `/api/traces` endpoint:

```bash
curl http://<your-ip-address>:16686/api/traces
```

This command will fetch traces from Jaeger and display the JSON response in your terminal.

6.Access Grafana by navigating to http://<your-ip-address>:3000 in your web browser.

To access Grafana using Linux commands, you can use a command-line web browser like curl or wget. Here's how you can do it using curl:

```bash
curl http://<your-ip-address>:3000
```

Log in using the default credentials:

- **Username:** admin
- **Password:** admin

After logging in, you'll be directed to the Grafana dashboard.

To configure data sources for visualizing **Jaeger traces**, follow these steps:

- Click on the "Configuration" (gear) icon on the left sidebar.
- Select "Data Sources".
- Click on "Add data source".
- Choose "Jaeger" from the list of available data sources.
- Enter the required information such as the URL of your Jaeger instance and any authentication details.
- Click "Save & Test" to verify the connection.

Once you've configured the Jaeger data source, you can create dashboards in Grafana to visualize the traces.Select the service, whose trace you want to visualise.

To configure data sources for visualising **Jaeger Metrics** like requests-per-second,span-per-second etc., follow these steps:

- Choose "Prometheus" from the list of available data sources.
- Enter the required information such as the URL of your Prometheus instance and authentication details.
- Click "Save & Test" to verify the connection.

Once you've configured the Prometheus data source, you can create dashboards in Grafana to visualize the metrics and and monitor the services' performance.

## Prerequisites

Before creating dashboards in Grafana, ensure you have the following:

- Grafana installed and running.
- Data sources configured in Grafana for the metrics you want to visualize (e.g., Prometheus, Jaeger).
- Access to the services you want to monitor.

## Creating Dashboards

Follow these steps to create dashboards in Grafana:

1.**Login to Grafana**: Navigate to [http://<your-ip-address>:3000] in your web browser and login with your credentials.

2. **Create a New Dashboard**:

   - Click on the "+" icon in the sidebar and select "Dashboard" to create a new dashboard.
   - Choose either "Add new panel" or "Add new row" to start building your dashboard layout.

3. **Add Panels**:

   - Click on "Add panel" to add a new visualization to your dashboard.
   - Select the type of visualization (e.g., Graph, Singlestat, Table) and configure the query to retrieve data from your data source.
   - Customize the panel settings, such as titles, axes, thresholds, etc., as needed.

4. **Organize Panels**:

   - Drag and drop panels to rearrange them on your dashboard.
   - Group related panels into rows or use folders to organize multiple dashboards.

5. **Save and Share**:

   - Click on "Save dashboard" to save your changes.
   - Give your dashboard a meaningful name and optionally add tags and descriptions.
   - Share your dashboard by clicking on the "Share" button and generating a shareable link or embedding code.

6. **Explore Built-in Dashboards**:

   - Grafana provides a variety of built-in dashboards for popular services and systems.
   - Click on the "Dashboard" dropdown menu and select "Manage" to explore and import built-in dashboards.

7. **Customize and Extend**:
   - Customize your dashboards further by adding annotations, alerts, and other features available in Grafana.
   - Explore Grafana plugins and integrations to extend the capabilities of your dashboards.

# Creating Dashboards for "Index" service

1.Login to Grafana
2.Navigate to Dashboard->New Dashboard->Add Visualisation
3.You can also import existing dashboards like "10001" or "12535".
4.Choose datasource as prometheus
5.Add the below queries:

The below query gives, the total query results:

```bash
jaeger_query_requests_total {operation="get_services", job="jaeger"}
```

The below query gives the traces received by "index" servics per second:

```bash
rate(jaeger_collector_traces_received_total{svc="index"}[1m])
```

To view metrics you can browse:

```bash
http://<your-ip-address>:5556
```

## Conclusion

Creating effective dashboards in Grafana is crucial for monitoring and understanding the performance of your systems. By following the steps outlined in this guide, you can build insightful dashboards tailored to your specific monitoring needs.

For more information and advanced dashboarding techniques, refer to the [Grafana documentation](https://grafana.com/docs/).

For more information with regards to jeager, refer to (https://squaredup.com/blog/auto-instrumenting-node-js-with-opentelemetry-jaeger/)
