import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRecipe, IUser, Time } from "shared";
import { Button, Card, Divider, Icon, IconButton, TextField } from "@material-ui/core";
import { createNewRecipe, getRecipesById, updateRecipe } from "src/store/effect";
import { getRecipeById, getUser } from "src/store/selectors";
import { ApplicationState } from "src/store/types";
import { getObjectRef } from "@nicollite/utils";
import "./style.scss";
import { useParams, useRouteMatch } from "react-router";
import { useHistory } from "react-router-dom";

const defaultIngredients = [{ text: "Ingrediente 1" }, { text: "Ingrediente 2" }];
const defaultSteps = [{ text: "Passo 1" }, { text: "Passo 2" }];
const defaultCookPhase = () => [
  {
    title: "Preparação",
    steps: defaultSteps.concat(),
  },
];

const defaultRecipeValue = (user: IUser): IRecipe => ({
  recipe_name: "",
  description: "",
  ingredients: defaultIngredients.concat(),
  cook_phases: defaultCookPhase().concat(),
  portions_amount: 0,
  preparation_time: {
    min: 0,
    hours: 0,
  },
  author: {
    uid: user?.uid || "",
    username: user?.username || "Anônimo",
  },
  created_at: new Date(),
});

const Recipe = () => {
  const editMatch = !!useRouteMatch("/recipes/:id/edit");
  const createMatch = !!useRouteMatch("/recipes/create");
  const [editMode] = useState(editMatch);
  const [createMode] = useState(createMatch);
  const showMode = !editMode && !createMode;

  const history = useHistory();

  const { id } = useParams<{ id: string }>();
  const recipe = useSelector<ApplicationState, IRecipe>(state => getRecipeById(state, id));
  const user = useSelector(getUser);

  const [recipeLoaded, setRecipeLoaded] = useState(false);

  let [newRecipe, _setNewRecipe] = useState(defaultRecipeValue(user));
  const setNewRecipe = r => _setNewRecipe(getObjectRef(r));

  if (recipe && !recipeLoaded) {
    setNewRecipe(getObjectRef(recipe));
    setRecipeLoaded(true);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    if (!recipe && !createMode) dispatch(getRecipesById(id));
  });

  function formatTime(time: Time): string {
    return time ? `${(time.hours || 0) * 60 + time.min} min` : "";
  }

  function handleSaveRecipe() {
    if (createMode) dispatch(createNewRecipe(newRecipe));
    else if (editMode) dispatch(updateRecipe(newRecipe));
    history.push(`/recipes`);
  }

  const RecipeNotFound = (
    <div className="flex justify-center">
      <h2>Receita não encontrada</h2>
    </div>
  );

  // If on show or edit mode and there is no recipe return RecipeNotFound
  if ((showMode || editMode) && !recipe) return <div className="Recipe">{RecipeNotFound}</div>;

  const EditButton = (
    <Button
      className="edit-button"
      variant="contained"
      color="primary"
      disableElevation
      onClick={() => {
        history.push(`/recipes/${id}/edit`);
      }}
    >
      <Icon>create</Icon>
      <span>Editar</span>
    </Button>
  );

  const RecipeInfo = (
    <Card elevation={0} className="recipe-info flex column gaps">
      <div className="flex justify-space-between">
        <span className="title">{newRecipe.recipe_name}</span>
        {newRecipe.author.uid === user.uid && EditButton}
      </div>
      <Divider />
      <div className="recipe-info-frames">
        <div>
          <span>Descrição:</span>
          <span>{newRecipe.description}</span>
        </div>
        <div>
          <span>Rendimento:</span>
          <span>{newRecipe.portions_amount} Porções</span>
        </div>
        <div>
          <span>Tempo de preparo:</span>
          <span>{formatTime(newRecipe.preparation_time)}</span>
        </div>
        <div className="author">
          <span>Autor:</span>
          <span>{newRecipe.author.username}</span>
        </div>
      </div>
    </Card>
  );

  const RecipeInfoEdit = (
    <Card elevation={0} className="recipe-info-edit flex column gaps">
      <TextField
        label="Nome da receita"
        className="title"
        defaultValue={newRecipe.recipe_name}
        onChange={e => {
          newRecipe.recipe_name = e.target.value;
          setNewRecipe(newRecipe);
        }}
      />
      <div className="recipe-info-frames">
        <div>
          <TextField
            label="Descrição"
            defaultValue={newRecipe.description}
            onChange={e => {
              newRecipe.description = e.target.value;
              setNewRecipe(newRecipe);
            }}
          />
        </div>
        <div>
          <TextField
            label="Rendimento em porções"
            type="number"
            defaultValue={newRecipe.portions_amount}
            onChange={e => {
              const value = parseInt(e.target.value);
              newRecipe.portions_amount = value < 0 ? 0 : value;
              setNewRecipe(newRecipe);
            }}
          />
        </div>

        <div>
          <span>Tempo de preparo:</span>
          <div className="preparation-time flex justify-space-between">
            <TextField
              label="horas"
              type="number"
              defaultValue={newRecipe.preparation_time.hours}
              onChange={e => {
                const value = parseInt(e.target.value);
                newRecipe.preparation_time.hours = Number.isNaN(value) || value < 0 ? 0 : value;
                setNewRecipe(newRecipe);
              }}
            />
            <TextField
              label="minutos"
              type="number"
              defaultValue={newRecipe.preparation_time.min}
              onChange={e => {
                const value = parseInt(e.target.value);
                newRecipe.preparation_time.min =
                  Number.isNaN(value) || value < 0 ? 0 : value > 60 ? 60 : value;
                setNewRecipe(newRecipe);
              }}
            />
          </div>
        </div>
        <div className="author">
          <span>Autor:</span>
          <span>{newRecipe.author.username}</span>
        </div>
      </div>
    </Card>
  );

  const Ingredients = (
    <div className="ingredient-list flex column gaps">
      <span className="title">Ingredientes</span>
      <Divider />
      <ul className="flex column gaps">
        {newRecipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.text}</li>
        ))}
      </ul>
    </div>
  );

  const IngredientsEdit = (
    <div className="ingredient-list-edit flex column gaps">
      <span className="title">Ingredientes</span>
      <Divider />
      <div className="input-text-removebtn-list flex column gaps">
        {newRecipe.ingredients.map((ingredient, index) => (
          <div key={index} className="flex justify-space-between">
            <TextField
              key={index}
              defaultValue={ingredient.text}
              onChange={e => {
                ingredient.text = e.target.value;
                setNewRecipe(newRecipe);
              }}
            />
            <IconButton
              onClick={() => {
                newRecipe.ingredients.splice(index, 1);
                setNewRecipe(newRecipe);
              }}
            >
              <Icon>clear</Icon>
            </IconButton>
          </div>
        ))}
        <Button
          className="add-button"
          variant="outlined"
          color="primary"
          onClick={() => {
            newRecipe.ingredients.push({ text: "" });
            setNewRecipe(newRecipe);
          }}
        >
          <div className="flex align-center gaps">
            <Icon>add</Icon>
            <span className="self-center">Adicionar ingrediente</span>
          </div>
        </Button>
      </div>
    </div>
  );

  const CookPhases = (
    <div className="cook-phase flex column gaps">
      <span className="title">Modo de preparo</span>
      <Divider />
      {newRecipe.cook_phases.map((cookPhase, index) => (
        <div key={index}>
          <span className="subtitle">{cookPhase.title}</span>
          <ul className="flex column gaps">
            {cookPhase.steps.map((step, index) => (
              <li key={index}>{step.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const CookPhasesEdit = (
    <div className="cook-phase-edit flex column gaps">
      <span className="title">Modo de preparo</span>
      <Divider />
      {newRecipe.cook_phases.map((cookPhase, index) => (
        <div key={index} className="flex column gaps">
          <div className="cook-phase-title-edit input-text-removebtn-list flex justify-space-between align-center">
            <TextField
              className="subtitle"
              key={index}
              label="Nome da Etapa"
              defaultValue={cookPhase.title}
              onChange={e => {
                cookPhase.title = e.target.value;
                setNewRecipe(newRecipe);
              }}
            />
            {index !== 0 && (
              <IconButton
                onClick={() => {
                  newRecipe.cook_phases.splice(index, 1);
                  setNewRecipe(newRecipe);
                }}
              >
                <Icon>clear</Icon>
              </IconButton>
            )}
          </div>
          <div className="flex column gaps">
            {cookPhase.steps.map((step, index) => (
              <div key={index} className="input-text-removebtn-list flex justify-space-between">
                <TextField
                  key={index}
                  defaultValue={step.text}
                  onChange={e => {
                    step.text = e.target.value;
                    setNewRecipe(newRecipe);
                  }}
                />
                <IconButton
                  onClick={() => {
                    cookPhase.steps.splice(index, 1);
                    setNewRecipe(newRecipe);
                  }}
                >
                  <Icon>clear</Icon>
                </IconButton>
              </div>
            ))}
            <Button
              className="add-button"
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => {
                cookPhase.steps.push({ text: "" });
                setNewRecipe(newRecipe);
              }}
            >
              <div className="flex align-center gaps">
                <Icon>add</Icon>
                <span className="self-center">Adicionar Passo</span>
              </div>
            </Button>
          </div>
        </div>
      ))}
      <Button
        className="add-button"
        variant="outlined"
        color="primary"
        onClick={() => {
          newRecipe.cook_phases.push(...defaultCookPhase().concat());
          setNewRecipe(newRecipe);
        }}
      >
        <div className="flex align-center gaps">
          <Icon>add</Icon>
          <span className="self-center">Adicionar Etapa de preparo</span>
        </div>
      </Button>
    </div>
  );

  const SaveButton = (
    <div className="flex justify-flex-end gaps">
      <Button variant="contained" color="primary" disableElevation onClick={handleSaveRecipe}>
        Salvar
      </Button>
    </div>
  );

  const ShowRecipe = (
    <>
      {RecipeInfo}
      {Ingredients}
      {CookPhases}
    </>
  );
  const EditRecipe = (
    <>
      {RecipeInfoEdit}
      {IngredientsEdit}
      {CookPhasesEdit}
      {SaveButton}
    </>
  );

  return <div className="Recipe flex column gaps">{showMode ? ShowRecipe : EditRecipe}</div>;
};

export default Recipe;
