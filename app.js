const itemCtrl = (function(){

    const Item = function(id,name,calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //data structure and state
     
    const data = {
        items:[
            // {
            //     id:0,
            //     name:'steak Dinner',
            //     calories:500
            // },
            // {
            //     id:2,
            //     name:'steak breakfast',
            //     calories:300
            // },
            // {
            //     id:3,
            //     name:'ice-cream',
            //     calories:400
            // }
        ],
        currentItem:null,
        totalcalories:0
    }
    return{

        getItem : function(){
          return data.items;
        },

        logdata : function(){
            return data
        },
        addItem:function(name , calories){
            let ID;
           if(data.items.length > 0){
             ID = data.items[data.items.length - 1].id+1;
           }else{
             ID=0;
           }
           calories=parseInt(calories);
           const newItem = new Item(ID,name,calories);
           data.items.push(newItem);
           return newItem;
        }
    }
})();

//UI controller

const uiCtrl = (function(){
    const uiSelectors ={
        itemList:'item-list',
        addBtn:'.add-btn',
        itemName:'item-name',
        itemCalories:'item-calories',
    }

 return{  
  populateItem : function(items){
    let html ='';
    items.forEach((item)=>{
       html += `
       <li class="collection-item" id="item-${item.id}">
       <strong>${item.name}: </strong> <em>${item.calories}</em>
       <a href="#" class="secondary-content">
         <i class="fa fa-pencil"></i>
       </a>
     </li>
       `      
    })
    document.getElementById(uiSelectors.itemList).innerHTML = html;
  },
  addtoList:function(newItem){
    document.getElementById(uiSelectors.itemList).style.display='block';
     const li = document.createElement('li');
     li.className = 'collection-item';
     li.id = `item-${newItem.id}`;
     li.innerHTML=` <strong>${newItem.name}: </strong> <em>${newItem.calories}</em>
     <a href="#" class="secondary-content">
       <i class="fa fa-pencil"></i>
     </a>`;
     document.getElementById(uiSelectors.itemList).insertAdjacentElement('beforeend',li);
  },
  getSelector(){
    return uiSelectors;
  },
  getItemInput(){
    return{
        name:document.getElementById(uiSelectors.itemName).value,
        calories:document.getElementById(uiSelectors.itemCalories).value
    }
  },
  clearFields:function(){
    document.getElementById(uiSelectors.itemName).value = '';
    document.getElementById(uiSelectors.itemCalories).value='';
  },
  hideList:function(){
    document.getElementById(uiSelectors.itemList).style.display = 'none';
  }
 }
})();

//app controller

const appCtrl = (function(itemCtrl , uiCtrl){

    const loadEventListner=function(){
        const getUIselector = uiCtrl.getSelector();

        document.querySelector(getUIselector.addBtn).addEventListener('click',itemAddsubmit);
    }
    
     const itemAddsubmit=function(e){
        const input = uiCtrl.getItemInput();
        // console.log(input);
        // itemCtrl.addtoList(input.name,input.calories);
        if(input.name !== "" && input.calories !== ''){
              const newItem = itemCtrl.addItem(input.name,input.calories);

              uiCtrl.addtoList(newItem);
              uiCtrl.clearFields();
        }
        e.preventDefault();
     }

    return{
        init : function(){
            // console.log("data Initializing...");
            //getItem for item controller

            const item = itemCtrl.getItem();

            if(item.length === 0){
                uiCtrl.hideList();
            }else{
               //populate item from Ui controller
            uiCtrl.populateItem(item);
            }

            
            
            loadEventListner()
        }
    }

})(itemCtrl,uiCtrl);

appCtrl.init();