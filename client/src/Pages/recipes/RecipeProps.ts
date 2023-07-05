export interface RecipeProps {
  title: string,
  description: string,
  content: string,
  cookTime: number,
  prepTime: number,
  servings: number,
  tags: string,
}

export interface RecipeData {
  recipe_id?: number,
  title: string,
  author?: { username: string }
  img?: string,
  name?: string,
  description: string,
  recipe_content: string,
  prep_time_in_minutes: number,
  cook_time_in_minutes: number,
  total_time_in_minutes?: number,
  servings: number,
  tags: string[],
  user_id: number
}