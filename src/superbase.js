import { createClient } from '@supabase/supabase-js';
const privateKey = import.meta.env.VITE_SUPABSE_ANON_KEY;
const VITE_SUPABSE_URL = 'https://tutnizjkuflqechjvxoo.supabase.co';
export const supabase = createClient(VITE_SUPABSE_URL, privateKey);

export async function delete_ingredient(ingredient) {
  const { data, error } = await supabase
    .from('ingredient')
    .delete()
    .eq('ingredientName', ingredient);

  if (error) {
    throw new error();
  } else {
    return 'Ingredient deleted successfully!';
  }
}

export async function upload_ingredient(ingredient) {
  const { data, count, error } = await supabase
    .from('ingredient')
    .select('*', { count: 'exact' });

  const all_ingredients = [];
  data.forEach((i) => {
    all_ingredients.push(i.ingredientName);
  });
  if (all_ingredients.includes(ingredient)) {
    return 'Error';
  } else {
    const update_count = count + 1;
    const { error2 } = await supabase.from('ingredient').insert([
      {
        ingredientId: update_count,
        ingredientName: ingredient,
      },
    ]);
    return 'Recipe has been uploaded!';
  }
}

export async function upload_recipe(recipeData) {
  const { data, count, error } = await supabase
    .from('recipes')
    .select('recipeId', { count: 'exact' });

  const id = count + 1;
  const ingredient_list = {
    ingredients: recipeData.ingredients,
  };
  const recipe_directions = {
    instructions: recipeData.directions,
  };
  const ingredient_ids = {
    ingredientIds: await ingredients_to_IDs(recipeData.ingredients),
  };
  const recipe_name = recipeData.name;
  const image_name = recipeData.name.toLowerCase().replace(/ /g, '-');

  const { error2 } = await supabase.from('recipes').insert([
    {
      recipeId: id,
      ingredients: ingredient_list,
      instructions: recipe_directions,
      ingredientsIds: ingredient_ids,
      recipeName: recipe_name,
      Image_Name: image_name,
    },
  ]);
  return 'Success!';
}

export async function see_all_data() {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .contains('ingredientsIds', { ingredientIds: [2] });
}

export async function ingredients_to_IDs(ingredients) {
  const Ids = [];
  for (const ingredient of ingredients) {
    const { data, error } = await supabase
      .from('ingredient')
      .select('ingredientId')
      .eq('ingredientName', ingredient);

    if (error) {
    } else if (data && data.length > 0) {
      Ids.push(data[0].ingredientId);
    }
  }
  return Ids;
}

export async function get_all_recipes(ingredient_ids) {
  const ids = await ingredients_to_IDs(ingredient_ids);
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .contains('ingredientsIds', { ingredientIds: ids });

  if (error) {
  } else {
  }
  console.log('data', data);
  const all_recipes = [];
  console.log('all_recipes', all_recipes);
  return data;
}

export async function get_all_ingredients() {
  const { data, error } = await supabase.from('ingredient').select('*');
  const all_ingredients = [];
  data.forEach((i) => {
    all_ingredients.push(i.ingredientName);
  });
  return all_ingredients;
}
