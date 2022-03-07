# Invoice Form

React and Express based web application for creating and listing invoice.

## File Structure

Both Client and Server files are in this repo, cd into respective folders.

## Demo

https://invoiceform.netlify.app/

## Installing

```bash
git clone 'https://github.com/lokesh12510/invoiceForm.git'
cd invoiceForm
cd client / cd server
npm install
```

### Start the Express Server

```bash
npm run server
```

### Start Create React App

In a different terminal tab...

```bash
npm start
```

## Environment Variables

To run this project, you will need to add the following **Cloudinary** environment variables to your .env file

`API_KEY`

`API_SECRET`

`CLOUD_NAME`

## API Reference

#### Get all Invoice

```http
  GET /api/invoice
```

#### Create Invoice

```http
  POST /api/invoice/create
```

## Tech Stack

**Client:** React, Material UI

**Server:** Node, Express

## Color Reference

| Color           | Hex                                                              |
| --------------- | ---------------------------------------------------------------- |
| Primary Color   | ![#009688](https://via.placeholder.com/10/009688?text=+) #009688 |
| Secondary Color | ![#00a152](https://via.placeholder.com/10/00a152?text=+) #00a152 |

## Authors

- [@lokesh12510](https://github.com/lokesh12510)
