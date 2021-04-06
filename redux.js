//People dropping their form (Action Creators)

const createPolicy =(name, amount)=>{
  return { //Form (Action) 
    type: "CREATE_POLICY" ,
    payload:{
      name:name,
      amount:amount
    }
  };
};

const deletePolicy =(name)=>{
  return {//Form (Action) 
   type: "DELETE_POLICY",
   payload:{
     name:name
   }
}

const createClaim =(name, amount)=>{
  return {//Form (Action) 
   type: "MAKE_CLAIM",
   payload:{
    name:name,
    amount:amount
    }
  }
};

//Departments (Reducers)
const claimHistoryDepartment = (oldListOfClaims=[], action) => {
  if (action.type ==="MAKE_CLAIM"){
    return [...oldListOfClaims, action.payload ]
  }
  return oldListOfClaims
};

const policyDepartment = (listOfPolicies=[],action) => {
  if (action.type === "CREATE_POLICY"){
    return [...listOfPolicies, action.payload]
  } else if (action.type === "DELETE_POLICY"){
    return listOfPolicies.filter(name=> name!== action.payload.name)
  }
  return listOfPolicies;
};

const accountingDepartment = (bagOfMoney=100, action) => {
  if ( action.type === "MAKE_CLAIM"){
    return bagOfMoney - action.payload.amount;
  } else if ( action.type === "CREATE_POLICY" ) {
    return bagOfMoney + action.payload.amount;
  }
  return bagOfMoney
  
};

 const { createStore, combineReducers } = Redux;
  
 const ourDepartments = combineReducers({
   accounting : accountingDepartment,
   policy: policyDepartment,
   claimHistory: claimHistoryDepartment
 })
 
 const store = createStore(ourDepartments);
 
 console.log(store.getState())