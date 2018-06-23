In this I have 4 tables 

1. users, comments, products, cart.

users:-
 id (primary key auto_incremented) name address email phone password
 
products:- 
 id (primary key auto Inc) name image description manufacturer price 

comments :-
  cId (primary key auto_inc) userId(foreign key  of user id) productId (foreign key  of products id) comment
cart:-
cartId (primary key auto_inc) userId (foreign key  of user id) productId (foreign key  of products id) count
 
 <b>FUNCTIONALITY OF MY PROJECT</b>
 
  IT WILL HAVE ALL THE MAIN FEATURES WHICH ARE ASKED BY NAGARRO

EXTRA FEATURES :-

1. USER WILL HAVE ALL THE FEATURES OF LOGGING IN, LOGGING OUT AND SIGNUP AND EVEN WITHOUT LOGGED IN HE WONT BE ABLE TO ACCESS THE PAGES OR WONT ABLE TO ACCESS THE SHOPPING CART (PROPER SESSIONS ARE MADE).

2. THERE IS AN INFO BUTTON TO EVERY PRODUCT ADDED BY THE ADMIN, THERE USERS CAN GIVE REVIEWS OF ANY PRODUCTS AVAILABLE IN CATALOGUE. 

3. ADMIN CAN EITHER ADD IMAGE URL OF THE PRODUCT OR HE CAN EVEN UPLOAD IMAGE OF THE PRODUCT WHICH IS STORED IN HIS P.C.

4. MOBILE COMPATIBILITY, THE SITE IS RESPONSIVE.
