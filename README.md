
# Upload Images #

<!-- [Link to Full Tutorial](https://merncraft.github.io/upload-images) -->

Many sites allow their visitors to upload images to the server. These images can then be used on custom pages. For example:
* The user's avatar
* Images of a product that the user is offering for sale
* Screenshots of an issue with an app that your site supports
* Photos for a social media site


If this is important for your project, you need to create a backend with four goals:

* Users must be able to upload images
* For each image uploaded, the server should save its details in a database
* The frontend must be able to query the database for specific images
* The frontend must be able to download the images that match the queries.


In this tutorial, you will be learning how to:

* Create an Express server to listen for POST requests from a web page
* Create an HTML form to choose files to upload, along with text fields containing meta data
* Use JavaScript to POST the form to the server
* Use the Multer Node module to read the meta data and save the files in a publicly accessible directory
* Move files from one location on the server to another
* Deal with file names with non-Roman characters, like 画像
* Store the URL of each image and its meta data in a MongoDB database, using Mongoose
* Create a form to query the database
* Download all the images that correspond to a given database query


