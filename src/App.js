import React, { Component } from 'react';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Modal from 'react-bootstrap/lib/Modal'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import './App.css';

class App extends Component {
   state =  {
    recipes: this.readData(),
  currentIndex: 0,
  newestRecipe: {recipeName:"",
                 ingredients:[],
                  howToCookIt: ""},
  showAdd: false,
  showEdit: false
  }
  
  initialData() {
    return [
      {recipeName: "Classic roast chicken & gravy",
      ingredients: ["onion roughly chopped", "carrots roughly chopped ", "free range chicken","Potatoes","Milk","Butter"],
       howToCookIt: "While the chicken is resting, make the gravy. Place the roasting tin over a low flame, then stir in the flour and sizzle until you have a light brown, sandy paste. Gradually pour in the stock, stirring all the time, until you have a thickened sauce. Simmer for 2 mins, using a wooden spoon to stir, scraping any sticky bits from the tin. Strain the gravy into a small saucepan, then simmer and season to taste. When you carve the bird, add any extra juices to the gravy."
      },
       {recipeName: "Mamaliga",
       ingredients: ["Malai", "apa" , "sare"],
        howToCookIt: "Heat the oil in a large casserole dish over a medium-high heat and cook the onion and garlic for a few mins. Stir in the sausages, breaking them up into small pieces as you go, and cook for another 8-9 mins. Stir in the chopped tomatoes, stock, purée and most of the rosemary. Bring to a simmer and cook for another 8-10 mins or until the mixture is thickened. Season to taste."
      },
        { recipeName: "Friptura de vita",
        ingredients: ["carne","ulei","sare","piper"],
         howToCookIt: "Grease a 23cm cake tin and heat oven to 180C/160C fan/gas 4. Put the lemons in a saucepan and cover with cold water. Bring to the boil, drain, pour over more cold water, then simmer for 1 hr until the lemons are really soft, topping up with more water if you need to. Drain the lemons well. When cool, halve them, remove the pips and blitz in a food processor to a purée."}
    ];

  }

  readData(){
      let data = localStorage.getItem("george_recipes");
      return (data && data.length) ? JSON.parse(data) : this.initialData();
  }
  saveData(recipes){
    localStorage.setItem("george_recipes",JSON.stringify(recipes));
  }

  validateName(value){
     if(value.target == "")
        alert("name is requiered");
        return false;
  }

  componentDidMount(){
    if(this.state.recipes.length < 0){
   let getData = this.readData();
   this.setState({recipes: getData});
    }


}

 
   deleteRecipe(index){
        let recipes = this.state.recipes.slice();
        recipes.splice(index,1);
        this.setState({recipes});
        this.saveData(recipes);
        console.log(localStorage.getItem("george_recipes"));  
   }//end of delete Recipe

  

   updateCurrentRecipeName(recipeName,currentIndex){
        let recipes = this.state.recipes;
        recipes[currentIndex] = {recipeName: recipeName, ingredients: recipes[currentIndex].ingredients, howToCookIt: recipes[currentIndex].howToCookIt }
        this.setState(recipes);  
        this.saveData(this.state.recipes);

   }

   updateCurrentIngredients(ingredients,currentIndex){
    let recipes = this.state.recipes;
    let tempingredients = ingredients;
    recipes[currentIndex] = {recipeName: recipes[currentIndex].recipeName, ingredients: tempingredients, howToCookIt: recipes[currentIndex].howToCookIt }
    this.setState(recipes);  
    this.saveData(this.state.recipes);

}

updateCurrentHowToCookIt(howToCookIt,currentIndex){
  let recipes = this.state.recipes;
  recipes[currentIndex] = {recipeName:  recipes[currentIndex].recipeName, ingredients: recipes[currentIndex].ingredients, howToCookIt: howToCookIt}
  this.setState(recipes);  
  this.saveData(this.state.recipes);

}

   updateNewRecipeName(recipeName){
        if(recipeName == "")
           alert("name is requiered");
        this.setState({newestRecipe:{recipeName:recipeName,
          ingredients:this.state.newestRecipe.ingredients
        ,howToCookIt:this.state.newestRecipe.howToCookIt}});
   }//Update newestRecipeName 

   updateNewRecipeIngredients(ingredients){
        let splitedIngredients = ingredients;   
   
    this.setState({newestRecipe:{recipeName:this.state.newestRecipe.recipeName,
      ingredients: splitedIngredients,
      howToCookIt:this.state.newestRecipe.howToCookIt}});
}//Update newestRecipeName 

updateNewRecipeHowToCookIt(howToCookIt){
  this.setState({newestRecipe:{
    recipeName:this.state.newestRecipe.recipeName,
    ingredients:this.state.newestRecipe.ingredients,
    howToCookIt}});
}//Update newestRecipeName 

updateRealState(){
   if(this.state.newestRecipe.recipeName == ""){
     alert('Name is requiered. No empty or null value allowed');
     return false;
   }
   console.log("merge");
    const stateTemp = this.state.recipes;
    stateTemp.push(this.state.newestRecipe);

   this.setState({stateTemp});
   this.setState({
     newestRecipe: {recipeName:"",
      ingredients:[],
     howToCookIt: ""}
    });
    this.saveData(this.state.recipes);
    console.log(localStorage.getItem("george_recipes"));  

    
   this.close();
}
    
   close = ()=> {
     if(this.state.showAdd)
       this.setState({showAdd: false});
     else if (this.state.showEdit)
       this.setState({showEdit: false});  
   } // function to close the Modal

   openAdd = (showAdd)=>{
          this.setState({[showAdd]: true});
          
           
   }

   openEdit = (showEdit,currentIndex)=>{
    this.setState({[showEdit]: true});
    this.setState({currentIndex:currentIndex});
    
   
}


   
   
  render() {
     const {recipes,currentIndex} = this.state; // destructuring
     return(
       <div className="App container">
        <h1 className="h1-specific">Nina`s special recipes!</h1>
          <Accordion >
            {recipes.map((recipe,index)=>{
               return(
                 <Panel className="hover" header={recipe.recipeName} eventKey={index} key={index} >
                 
                   <h2 ><i className="fa fa-cutlery iconfa" aria-hidden="true"></i> Ingredients</h2>
                   <ol className="align-left ol-style">
                      {recipe.ingredients.map((item)=>{
                        return(<li key={item}>

                               {item} 
                              
                          </li>);
                      })}
                   
                   </ol>
                   <h2><i className="fa fa-cutlery  iconfa" aria-hidden="true"></i> Cooking instructions ...</h2>
                   <p className="align-left cooking-instructions">{recipe.howToCookIt}</p>
                   <ButtonToolbar className="to-center">
                     <Button className="special-css-button" bsStyle="danger" onClick={(event)=>this.deleteRecipe(index)}> Delete </Button>
                     <Button className="special-css-button" bsStyle="info" onClick={(event)=> this.openEdit("showEdit",index)}> Edit </Button>
                   </ButtonToolbar>

                   

                 </Panel>

                 
               );
            })}
          
          
          </Accordion>

          <Modal show={this.state.showEdit} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title> Edit Recipe</Modal.Title>
          </Modal.Header>       
          <Modal.Body>
          <FormGroup controlId="formBasicTextEdit">
          <ControlLabel>Edit Recipe Name</ControlLabel>
          
          <FormControl type="text" value={this.state.recipes[currentIndex].recipeName}
                       placeholder="Edit Recipe Name" 
                       onChange={(event)=>this.updateCurrentRecipeName(event.target.value,currentIndex)}>
             
          </FormControl>
        </FormGroup>
        <FormGroup controlId="formBasicText2Edit">
        <ControlLabel>Edit Ingredients<i className="fa fa-exclamation-triangle warning-ico" aria-hidden="true"></i> Each ingredient separated by comma!</ControlLabel>
        <FormControl type="text" value={this.state.recipes[currentIndex].ingredients.join(",")}
                     placeholder="Edit ingredients and separate them with a comma" 
                     onChange={(event)=>this.updateCurrentIngredients(event.target.value.split(","),currentIndex)}>
           
        </FormControl>
      </FormGroup>
      <FormGroup controlId="formControlsTextareaEdit">
      <ControlLabel>Edit cooking instructions</ControlLabel>
      <FormControl type="text" componentClass="textarea" className='text-area-height' value={this.state.recipes[currentIndex].howToCookIt}
                   placeholder="Edit instructions" 
                   onChange={(event)=>this.updateCurrentHowToCookIt(event.target.value,currentIndex)}>
         
      </FormControl>

    </FormGroup>
          </Modal.Body>
          <Modal.Footer>
          <Button bsStyle="info" className="to-center" onClick={this.close}>Done</Button>
          </Modal.Footer>     

      </Modal> 
      

          <Modal  show={this.state.showAdd} onHide={this.close}>
             <Modal.Header closeButton>
               <Modal.Title> Add Recipe</Modal.Title>
               </Modal.Header>  
               <Modal.Body>
                 <FormGroup controlId="formBasicText">
                    <ControlLabel>Recipe Name</ControlLabel>
                    <FormControl type="text" value={this.state.newestRecipe.recipeName}
                                 placeholder="Insert Name" 
                                 onChange={(event)=>this.updateNewRecipeName(event.target.value)}>
                       
                    </FormControl>
                  </FormGroup>
                  <FormGroup controlId="formBasicText2">
                  <ControlLabel>Ingredients <i className="fa fa-exclamation-triangle warning-ico" aria-hidden="true"></i> Each ingredient separated by comma!</ControlLabel>
                  <FormControl type="text" value={this.state.newestRecipe.ingredients}
                               placeholder="List the ingredients separated by a coma" 
                               onChange={(event)=>this.updateNewRecipeIngredients(event.target.value.split(","))}>
                     
                  </FormControl>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                <ControlLabel>How to Cook it</ControlLabel>
                <FormControl type="text" componentClass="textarea" className='text-area-height' value={this.state.newestRecipe.howToCookIt}
                             placeholder="Type instruction of how to cook" 
                             onChange={(event)=>this.updateNewRecipeHowToCookIt(event.target.value)}>
                   
                </FormControl>

              </FormGroup>
               </Modal.Body>
              <Modal.Footer>
             <Button bsStyle="info" className="to-center" onClick={this.updateRealState.bind(this)}>Submit</Button>
             </Modal.Footer>
          </Modal>
          <Button className="special-css-button" bsStyle="primary" onClick={(event)=>this.openAdd("showAdd")}> Add Recipe</Button>
       </div>
     );
  }
}


export default App;

//To do`s at the end
//1. to add a form validation for new recipe to request at least one entry before 
//2. refactor close method
