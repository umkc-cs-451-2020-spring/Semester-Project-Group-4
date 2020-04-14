# API  

## Users  

 ### 1. Register/ Create User (POST, http://localhost:3000/api/user) 
    
    -- Request --     
    {  
      "username": "myUsername",  
      "firstName": "Name",  
      "lastName": "Name2",  
      "phone": "555-555-5555",  
      "email": "test@gmail.com",  
      "password": "Test2000!",  
      "confirmPassword": "Test2000!",  
      "checking": [{  
        "accountType": "checking",  
        "accountNumber": 1,  
        "processDate": "2/22/2020",  
        "balance": 1000,  
        "amount": 100,  
        "description": "Open checking account"  
        }],  
      "moneyMarket": [],  
      "savings": []  
    }  
  
 ### 2. Update User (PUT, http://localhost:3000/api/user/id)
   
    -- Request --   
    {  
	    "firstName": "UpdatedName"  
    }  

  ### 3. Delete User (DELETE, http://localhost:3000/api/user/id)  

  ### 4. Get Specific User (GET, http://localhost:3000/api/user/username)  
   
    -- Response --   
    {  
      "username": "myUsername",  
      "firstName": "Name",  
      "lastName": "Name2",  
      "phone": "555-555-5555",  
      "email": "test@gmail.com",  
      "password": "Test2000!",  
      "confirmPassword": "Test2000!",  
      "checking": [{  
        "accountType": "checking",  
        "accountNumber": 1,  
        "processDate": "2/22/2020",  
        "balance": 1000,  
        "amount": 100,  
        "description": "Open checking account"  
        }],  
      "moneyMarket": [],  
      "savings": []  
    }  
  
 ### 5. Login/ User Exists (POST, http://localhost:3000/api/getchecking/username)
    
    -- Request --   
    {  
	  "username": "myUsername",  
	  "password": "myPassword!"  
    }  

## Accounts

 ### 1. Get Specific Account (GET, http://localhost:3000/api/getchecking/username OR http://localhost:3000/api/getsavings/username OR http://localhost:3000/api/getmoneymarket/username)  

    -- Response --   
    {  
      "success": true,  
      "data": [  
          {  
              "_id": "5e5d9092e68cf7347c487dff",  
              "accountType": "checking",  
              "accountNumber": 1,  
              "processDate": "2/22/2020",  
              "balance": 1000,  
              "amount": 100,  
              "description": "Open checking account",  
              "createdAt": "2020-03-02T23:02:42.650Z",  
              "updatedAt": "2020-03-02T23:02:42.650Z"  
            }  
        ]  
    }  

  ### 2. Add Transaction (POST, http://localhost:3000/api/addchecking/username OR http://localhost:3000/api/addsavings/username OR http://localhost:3000/api/addmoneymarket/username)    
   
    -- Request --     
    {  
      "accountType": "money market",  
      "accountNumber": 1,  
      "processDate": "2/22/2020",  
      "balance": 1000,  
      "amount": 50000,  
      "description": "Open checking account"  
    }

 ### 3. Get Balance (GET, http://localhost:3000/api/checkingbalance/username OR http://localhost:3000/api/savingsbalance/username OR http://localhost:3000/api/moneymarketbalance/username)  

    -- Response --   
    {  
      "success": false,  
      "data": [  
          {  
              "_id": null,  
              "amount": 2600  
          },  
          {  
              "_id": null,  
              "amount": 50100  
          },  
          {  
              "_id": null,  
              "amount": 100  
          } 
      ]  
    }  

## Notifcations

 ### 1. Get Notifications (GET, http://localhost:3000/api/getnotifications/username)
```
   -- Response --   
   {
    "success": true,
    "data": [
        {
            "_id": "5e94b3dde01092328cb25158",
            "largeDeposit": 2000,
            "largeWithDrawal": 2000,
            "overDraft": 1200,
            "createdAt": "2020-04-13T18:47:57.555Z",
            "updatedAt": "2020-04-13T23:35:42.703Z",
            "disableLargeDeposit": false,
            "disablelargeWithDrawal": false,
            "disableoverDraft": false
        }
    ]
  }  
  ```

   ### 2. Create Notifications (POST, http://localhost:3000/api/addnotification/username)
```
  -- Request --   
   {
    "largeDeposit": 2000,
    "largeWithDrawal": 2000,
    "overDraft": 1200,
    "disableLargeDeposit": false,
    "disablelargeWithDrawal": false,
    "disableoverDraft": false
  }

   -- Response --   
   {
    "success": true,
    "data": [
        {
          "_id": "5e94b3dde01092328cb25158",
          "largeDeposit": 2000,
          "largeWithDrawal": 1000,
          "overDraft": 1200,
          "disableLargeDeposit": false,
          "disablelargeWithDrawal": false,
          "disableoverDraft": false
          "createdAt": "2020-04-13T18:47:57.555Z",
          "updatedAt": "2020-04-13T23:35:42.703Z"
        }
    ]
  }
  ```    

   ### 3. Update Notifications (PUT, http://localhost:3000/api/updatenotifications/username)
```
  -- Request --   
 {
    "largeDeposit": 100,
    "largeWithDrawal": 100,
    "overDraft": 300,
    "disableLargeDeposit": true,
    "disablelargeWithDrawal": false,
    "disableoverDraft": true
  }

  -- Response --   
  {
    "success": true,
    "data": [
        {
          "_id": "5e94b3dde01092328cb25158",
          "largeDeposit": 100,
          "largeWithDrawal": 100,
          "overDraft": 300,
          "disableLargeDeposit": true,
          "disablelargeWithDrawal": false,
          "disableoverDraft": true
          "createdAt": "2020-04-13T18:47:57.555Z",
          "updatedAt": "2020-04-13T23:35:42.703Z"
        }
    ]
  }    
  ```
