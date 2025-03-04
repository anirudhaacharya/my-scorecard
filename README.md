# Performance Analysis Dashboard

This project is a full-stack application that demonstrates a performance analysis dashboard. It consists of a React-based frontend for interactive data visualization and a Django backend that serves performance data via a RESTful API.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Overview

The Performance Analysis Dashboard allows users to:
- **Visualize Data:** See performance scores in an interactive bar chart.
- **Export Data:** Download performance records as a CSV file.
- **Manage Records:** Delete individual records.
- **View Detailed Metrics:** Display metrics like productivity, quality, and timeliness with their respective weights.

## Features

- **Interactive Dashboard:** Uses [Chart.js](https://www.chartjs.org/) (via [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2)) for dynamic charts.
- **CSV Export:** Easily export performance data to CSV.
- **Responsive Design:** Built with [Material UI](https://mui.com/) for a seamless experience on both desktop and mobile.
- **Data Management:** Fetches and displays data from a Django backend API and allows deletion of records.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **Material UI**: For responsive UI components.
- **Chart.js & react-chartjs-2**: For data visualization.
- **lz-string & file-saver**: For data compression and file export.

### Backend
- **Django**: Python web framework for the backend API.
- **Django REST Framework** (if used): To create RESTful endpoints.
