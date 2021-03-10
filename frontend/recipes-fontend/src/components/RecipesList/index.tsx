import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRecipe } from "shared";
import {
  Card,
  CardActionArea,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Icon,
  Button,
} from "@material-ui/core";
import { getRecipesNextPage } from "src/store/effect";
import { getUser, selectRecipesPage } from "src/store/selectors";
import { ApplicationState } from "src/store/types";
import { reduceString } from "src/pipes/reduce-string";
import { sliceArray } from "@nicollite/utils";
import "./styles.scss";
import { getLastRecipeId } from "src/store/selectors";
import { useHistory } from "react-router";

const RecipesList = () => {
  const maxDescriptionLength = 150;
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(getUser);

  const recipes = useSelector<ApplicationState, IRecipe[]>(state =>
    selectRecipesPage(state, page, pageSize),
  );
  const lastId = useSelector(getLastRecipeId);

  useEffect(() => {
    dispatch(getRecipesNextPage({ lastId, pageSize }));
  }, []);

  function changePage(change: "previous" | "next") {
    let pageNumber = change === "previous" ? page - 1 : page + 1;
    if (pageNumber < 0) {
      pageNumber = 0;
      return;
    }
    dispatch(getRecipesNextPage({ lastId, pageSize }));
    setPage(pageNumber);
  }

  function navigateToRecipe(id: string) {
    history.push(`recipes/${id}`);
  }

  function createNewRecipe() {
    history.push(`recipes/create`);
  }

  const CreateNewRecipeButton = (
    <Button variant="contained" color="primary" disableElevation onClick={createNewRecipe}>
      <Icon>add</Icon>
      <span>Criar Nova Receita</span>
    </Button>
  );

  const pageSizeValues = [10, 20, 30];
  const disablePreviousSquareIcon = page === 0 ? "disabled-style-square-icon" : "";

  const Filters = (
    <div className="filters flex column gaps">
      <div className="flex justify-space-between align-center gaps">
        <FormControl>
          <Select
            defaultValue={pageSizeValues[0]}
            onChange={e => {
              setPageSize(e.target.value as number);
              dispatch(getRecipesNextPage({ lastId, pageSize }));
            }}
          >
            {pageSizeValues.map((size, index) => (
              <MenuItem key={index} value={size}>
                {size} por página
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="page-navigator flex gaps">
          <span>Página</span>
          <span className="styled-square">{page + 1}</span>
          {/* TODO add amount of pages */}
          <span>de X</span>
          <Icon
            className={`styled-square style-square-icon ${disablePreviousSquareIcon}`}
            onClick={() => changePage("previous")}
          >
            chevron_left
          </Icon>
          <Icon className="styled-square style-square-icon" onClick={() => changePage("next")}>
            chevron_right
          </Icon>
        </div>
      </div>
      <div className="flex justify-flex-end">{user && CreateNewRecipeButton}</div>
    </div>
  );

  const recipeCardList = recipes.map(recipe => (
    <Card className="recipe-card" key={recipe._id} variant="outlined">
      <CardActionArea onClick={() => navigateToRecipe(recipe._id)}>
        <div className="recipe-card-texts flex column gaps">
          <span className="recipe-title">{recipe.recipe_name}</span>
          <Divider />
          <span className="recipe-desc">
            {reduceString(recipe.description, maxDescriptionLength)}
          </span>
        </div>
      </CardActionArea>
    </Card>
  ));

  const RecipeRowsList = (
    <div className="recipe-columns-wrapper flex column justify-space-around gaps">
      {sliceArray(recipeCardList, 2).map((row, index) => {
        const justifyContent = row.length > 1 ? "justify-space-between" : "flex-start";
        return (
          <div className={`flex ${justifyContent}`} key={index}>
            {row}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="RecipeList flex column gaps">
      {Filters}
      {RecipeRowsList}
    </div>
  );
};

export default RecipesList;
