# File Upload and Processing Application

This React application allows users to upload and process CSV and Excel files with a modern, user-friendly interface.

## Features

- Drag and drop file upload interface
- Support for CSV (.csv) and Excel (.xlsx, .xls) files
- File size validation (max 5MB)
- File type validation
- Loading states and error handling
- Responsive design with Tailwind CSS
- Clean and intuitive user interface

## Environment Variables

Create a `.env.development` file with the following variables:

REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_MAX_FILE_SIZE=5242880

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Superstar221/csv-file-processing-ui.git
```
2. Install dependencies:
```bash
npm install
```

3. Create the environment file and set your variables:
```bash
cp .env.example .env.development
```

4. Start the development server:
```bash
npm start
```
