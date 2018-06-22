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
 

