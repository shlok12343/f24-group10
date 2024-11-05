import pandas as pd

common_ingredients = [
    'pineapple', 'bell peppers', 'green beans', 'coconut milk', 'almond milk',
    'sour cream', 'cream cheese', 'breadcrumbs', 'red pepper flakes', 'cayenne pepper',
    'cornstarch', 'soybeans', 'sausages', 'lemongrass', 'honeydew',
    'coconut cream', 'brown sugar', 'powdered sugar', 'coconut sugar', 'fish sauce',
    'salt', 'pepper', 'olive oil', 'butter', 'garlic',
    'onions', 'lemon', 'eggs', 'milk', 'flour',
    'sugar', 'baking powder', 'baking soda', 'vanilla extract', 'tomatoes',
    'potatoes', 'chicken', 'beef', 'pork', 'fish',
    'rice', 'pasta', 'cheese', 'carrots', 'celery',
    'broccoli', 'spinach', 'mushrooms', 'zucchini', 'cucumber',
    'corn', 'peas', 'avocado', 'soy sauce', 'vinegar',
    'honey', 'mustard', 'mayonnaise', 'ketchup', 'cream',
    'yogurt', 'parmesan', 'mozzarella', 'cheddar', 'feta',
    'tofu', 'lentils', 'beans', 'quinoa', 'oats',
    'bread', 'tortillas', 'chili powder', 'paprika', 'cumin',
    'oregano', 'thyme', 'basil', 'rosemary', 'parsley',
    'cilantro', 'dill', 'sage', 'bay leaves', 'cinnamon',
    'nutmeg', 'ginger', 'turmeric', 'curry powder', 'coriander',
    'cardamom', 'cloves', 'allspice', 'chili flakes', 'saffron',
    'sesame oil', 'canola oil', 'vegetable oil', 'peanut oil', 'coconut oil',
    'gelatin', 'tempeh', 'shrimp', 'scallops', 'crab',
    'lobster', 'bacon', 'ham', 'salmon', 'tuna',
    'mackerel', 'anchovies', 'sardines', 'lime', 'orange',
    'grapefruit', 'apple', 'banana', 'strawberries', 'blueberries',
    'raspberries', 'blackberries', 'peaches', 'pears', 'plums',
    'cherries', 'mango', 'papaya', 'kiwi', 'grapes',
    'watermelon', 'cantaloupe', 'dates', 'figs', 'raisins',
    'cranberries', 'walnuts', 'almonds', 'cashews', 'pistachios',
    'peanuts', 'hazelnuts', 'pecans', 'sunflower seeds', 'pumpkin seeds',
    'chia seeds', 'flax seeds', 'sesame seeds', 'coconut flakes', 'cocoa powder',
    'chocolate chips', 'maple syrup', 'molasses', 'agave nectar', 'tomato paste',
    'tomato sauce', 'Worcestershire sauce', 'sriracha', 'hot sauce', 'tabasco',
    'hoisin sauce', 'barbecue sauce'
]



#print(df)