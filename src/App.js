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
   state = {
     recipes:[
       {recipeName: "Mash potatoes and Hallumi Cogonse",
        ingredients: ["Hallumi chesee", "Salt ", "Peper","Potatoes","Milk","Butter"],
         howToCookIt: "boil the potatoes and mix them with butter and salt and milk"
        },
         {recipeName: "Mamaliga",
         ingredients: ["Malai", "apa" , "sare"],
          howToCookIt: "Se fierbe si se lasa"
        },
          { recipeName: "Friptura de vita",
          ingredients: ["carne","ulei","sare","piper"],
           howToCookIt: "Se fierbe si se lasa"}
     ],
     showAdd: false,
     newestRecipe: {recipeName:"",
                    ingredients:[],
                     howToCookIt: ""}
   }

   deleteRecipe(index){
        let recipes = this.state.recipes.slice();
        recipes.splice(index,1);
        this.setState({recipes});
   }//end of delete Recipe

   updateNewRecipeName(recipeName){
        this.setState({newestRecipe:{recipeName:recipeName,
          ingredients:this.state.newestRecipe.ingredients
        ,howToCookIt:this.state.newestRecipe.howToCookIt}});
   }//Update newestRecipeName 

   updateNewRecipeIngredients(ingredients){
        let splitedIngredients = ingredients.split(" ");   
   
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
   console.log("merge");
    const stateTemp = this.state.recipes;
    stateTemp.push(this.state.newestRecipe);
    console.log(stateTemp);
   this.setState({stateTemp});
   this.setState({
     newestRecipe: {recipeName:"",
      ingredients:[],
     howToCookIt: ""}
    });
   
   this.close();
}
    
   close = ()=> {
     if(this.state.showAdd)
       this.setState({showAdd: false});
   } // function to close the Modal

   open = (showAddString)=>{
          this.setState({[showAddString]: true});
   }

  render() {
     const {recipes} = this.state; // destructuring
     return(
       <div className="App container">
        <h1>Nina special recipes</h1>
          <Accordion>
            {recipes.map((recipe,index)=>{
               return(
                 <Panel header={recipe.recipeName} eventKey={index} key={index}>
                   <ol>
                      {recipe.ingredients.map((item)=>{
                        return(<li key={item}>

                               {item} 
                              
                          </li>);
                      })}
                   
                   </ol>
                   <h2>{recipe.howToCookIt}</h2>
                   <ButtonToolbar className="to-center">
                     <Button className="special-css-button" bsStyle="danger" onClick={(event)=>this.deleteRecipe(index)}> Delete </Button>
                     <Button className="special-css-button" bsStyle="info"> Edit </Button>
                   </ButtonToolbar>

                 </Panel>
               );
            })}
          
          
          </Accordion>
          <Modal  show={this.state.showAdd} onHide={this.close}>
             <Modal.Header closeButton>
               <Modal.Title> Add Recipe</Modal.Title>
               <Modal.Body>
                 <FormGroup controlId="formBasicText">
                    <ControlLabel>Recipe Name</ControlLabel>
                    <FormControl type="text" value={this.state.newestRecipe.recipeName}
                                 placeholder="Insert Name" 
                                 onChange={(event)=>this.updateNewRecipeName(event.target.value)}>
                       
                    </FormControl>
                  </FormGroup>
                  <FormGroup controlId="formBasicText2">
                  <ControlLabel>Ingredients</ControlLabel>
                  <FormControl type="text" value={this.state.newestRecipe.ingredients}
                               placeholder="List the ingredients" 
                               onChange={(event)=>this.updateNewRecipeIngredients(event.target.value)}>
                     
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
             </Modal.Header>  
             <Button bsStyle="info" className="to-center" onClick={this.updateRealState.bind(this)}>Submit</Button>
          </Modal>
          <Button className="special-css-button" bsStyle="primary" onClick={(event)=>this.open("showAdd")}> Add Recipe</Button>
       </div>
     );
  }
}

export default App;

//To do`s at the end
//1. to add a form validation for new recipe to request at least one entry before 
//2. to sort out edit modal from 57***