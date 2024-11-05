const { createClient } = require('@supabase/supabase-js');
const { parse } = require('dotenv');
// Load environment variables from .env file
require('dotenv').config();

const privateKey = process.env.VITE_SUPABSE_ANON_KEY;
const VITE_SUPABSE_URL = 'https://tutnizjkuflqechjvxoo.supabase.co'
const supabase = createClient(VITE_SUPABSE_URL, privateKey);


let globaldata;

async function loadData() {
    const { data, error } = await supabase
      .from('ingredient')  // Replace with your table name
      .select('ingredientName');  // Replace with specific columns if needed

    if (error) {
        console.error('Error fetching data:', error);
    } else {
        globaldata = data;  // Assign the data to globaldata
    }
}

async function processIngredients() {
    await loadData();  

    if (globaldata) {
      const ingredientNames = globaldata.map(item => item.ingredientName);
      return ingredientNames
    }
  else {
        console.log('No data available.');
    }
}

// filter, upload, delete, update, add to frontend
//

// Call the function to load and process the data
processIngredients();



async function see_all_data() {
  await loadData();

  if (globaldata) {
      console.log(globaldata);  // Will show the array content
  } else {
    console.log("No data")
  }

}
async function uploadData() {
  await loadData();
  let i = 1
  for(const item of ingredients) {
    const {  error } = await supabase
    .from('ingredient') // Replace with your actual table name
    .insert([{
      ingredientId: i,
      ingredientName: item
    }]);
  i++
  }

  if (error) {
    console.error('Error uploading data:', error);
  } else {
    console.log('Data successfully uploaded:', data);
  }
}
//see_all_data()

