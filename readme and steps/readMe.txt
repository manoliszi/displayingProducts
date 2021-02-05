/* server */
Used mysql and node.js

for mysql I run in the mysql command line 
mysql> 'source C:\Users\Manolis\Desktop\testProject\dbCreation.sql'
That way, the database, the table are created and the insertions are taking place 
(this step took more than 2 days :( ).

index.js is connected to the database.
it's the way of connecting the server with the client.
We initialiaze and install node.js with the commands 'npm init' and 'npm install'
There is a query that asks for all the data in the table, 
taking into consideration the page that the client is in (starting from page 1) and gets
back from mysql 10 rows at a time,
in order for the client to use it.
I run 'node index.js' in the command line.
server-1.png provides us with the json that contains the data of the server (we are on
localhost:3000/products/?page=1).

/* client */
html:
we have the header, the buttons for our functionalities, our divs (10 divs per page), 
and the pagination section.
the divs are initially empty, but they are filled later on in the script section.
test-1.png provides us with the initial image that we have.
The divs are filled because we are fetching the data from the index.js and we fill the obj
variable.
The divs are filled backwards so we will be able to sort it if we would like to.
If we press the sort page button, we compaire the serialNumber of the divs and displaying them
in the right order.
test-2.png provides us with the sorting of the first page.
We can type a number in the input section and then press the button to find that product
with the serial number.
test-3.png provides us with the outcome that we have if we press the search button with a
number that is contained in the page.
test-4.png provides us with the outcome that we have if we press the search button with a
number that is not contained in the page.
We can always press the reset button to reset the page and provides again with all the divs.
test-5.png provides us with the page after we press the right angle arrow of the pagination. 
The displaying divs are now 41 - 50 (again we display it backwards so we can sort it) (we are
fetching data of an other page each time, increasing or decreasing the page variable of the url).