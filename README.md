# GRAFANA DOCUMENTATION FOR TRACES

## Introduction

This repository provides guidance and resources for setting up traces monitoring using Jaeger and Grafana in your distributed systems.

1. Set up your own NodeJs Microservice, by navigating to your microservices directory.
2. After the process of application set up completes, we will start with the docker compose file.
3. We have to use the necessary Docker images from Docker hub:

# Grafana Overview

a) Grafana runs on port 3000

## Introduction

Grafana is an open-source analytics and visualization platform that allows you to query, visualize, and understand your metrics data through interactive and customizable dashboards. It supports a wide range of data sources, including databases, time series databases, and monitoring systems, making it a versatile tool for monitoring and observability.

## Key Features

- **Data Source Integration**: Grafana supports integration with various data sources such as Prometheus, Graphite, InfluxDB, Elasticsearch, and many others, enabling you to query and visualize data from multiple sources in a unified dashboard.

- **Rich Visualization Options**: Grafana provides a wide range of visualization options including graphs, tables, heatmaps, histograms, and more. You can customize the appearance and layout of your visualizations to suit your specific needs.

- **Dashboard Templating**: Grafana allows you to create dynamic dashboards using template variables, enabling you to create reusable and flexible dashboards that can adapt to different environments and use cases.

- **Alerting and Notifications**: Grafana provides built-in support for alerting and notifications based on thresholds and conditions defined in your data queries. You can configure alerts to trigger notifications via email, Slack, PagerDuty, and other channels.

- **User Management and Permissions**: Grafana offers robust user management and permissions features, allowing you to control access to dashboards and data sources based on user roles and permissions.

b) Prometheus runs on port 9090

# Prometheus

## Introduction

Prometheus is an open-source monitoring and alerting toolkit originally built at SoundCloud. It's now a standalone open-source project and part of the Cloud Native Computing Foundation. Prometheus is designed for reliability, scalability, and ease of use in monitoring dynamic cloud-native environments.

## Key Features

- **Time Series Database**: Prometheus stores time series data, making it easy to collect and query metrics over time.
- **Multi-Dimensional Data Model**: Prometheus uses a flexible data model with key-value pairs, enabling rich queries and filtering.

- **PromQL Query Language**: Prometheus Query Language (PromQL) allows users to query and visualize metrics collected by Prometheus.

- **Pull-Based Architecture**: Prometheus adopts a pull-based model, where it scrapes metrics from instrumented targets at regular intervals.

- **Service Discovery**: Prometheus supports various service discovery mechanisms, including static configuration, DNS-based discovery, and integrations with cloud providers.

- **Alerting**: Prometheus has built-in support for alerting based on query expressions. It can send alerts to various notification channels such as email, Slack, PagerDuty, etc.

# Jaeger

## Introduction

Jaeger is an open-source distributed tracing system, originally developed by Uber Technologies, used for monitoring and troubleshooting microservices-based architectures. It helps in understanding the flow of requests through your distributed system by providing insights into the latency and performance of individual services and the interactions between them.

## Key Features

- **Distributed Tracing**: Jaeger provides distributed tracing capabilities, allowing you to trace requests as they propagate through various services in your system.

- **Visualization**: It offers a web-based user interface (UI) for visualizing traces, enabling you to analyze the flow of requests, identify latency bottlenecks, and troubleshoot issues.

- **Sampling**: Jaeger supports adaptive sampling strategies to control the volume of traces collected, allowing you to balance resource usage with the level of detail required for monitoring and troubleshooting.

- **Integration**: It integrates seamlessly with popular frameworks and libraries, making it easy to instrument your services with Jaeger client libraries or agents to generate traces.

After men tioning all this requirements in docker-compose.yaml file, execute the commands given below:

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
   a. Change the IP-ADDRESS to Your IP-ADDRESS

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
curl http://localhost:16686/api/traces
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
- Enter the required information such as the URL of your Jaeger instance and any authentication details if needed.
- Click "Save & Test" to verify the connection.

Once you've configured the Jaeger data source, you can create dashboards in Grafana to visualize the traces and monitor your services' performance.

To configure data sources for visualising **Jaeger Metrics** like requestspersecond,spanspersecond etc., follow these steps:

- Click on the "Configuration" (gear) icon on the left sidebar.
- Select "Data Sources".
- Click on "Add data source".
- Choose "Prometheus" from the list of available data sources.
- Enter the required information such as the URL of your Prometheus instance and authentication details if needed.
- Click "Save & Test" to verify the connection.

Once you've configured the Prometheus data source, you can create dashboards in Grafana to visualize the metrics and and monitor the services' performance.

# Creating Dashboards in Grafana

This guide outlines how to create various dashboards in Grafana to visualize metrics and monitor your services' performance.

## Introduction

Grafana provides a flexible and powerful platform for creating dashboards that visualize data from various sources, including Prometheus, Jaeger, and more. Dashboards can display metrics, logs, traces, and other relevant information to help you monitor your systems effectively.

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

## Conclusion

Creating effective dashboards in Grafana is crucial for monitoring and understanding the performance of your systems. By following the steps outlined in this guide, you can build insightful dashboards tailored to your specific monitoring needs.

For more information and advanced dashboarding techniques, refer to the [Grafana documentation](https://grafana.com/docs/).

For more information with regards to jeager, refer to (https://squaredup.com/blog/auto-instrumenting-node-js-with-opentelemetry-jaeger/)
