import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Header from "src/components/Header";
import Recipe from "src/components/Recipe";
import RecipesList from "src/components/RecipesList";
import { PrivateRoute } from "src/Router";
import "./style.scss";

function Home() {
  const showWelcomeMessage = !!useRouteMatch({ path: "/", exact: true });

  const WelcomeMessage = () => (
    <div className="flex justify-center">
      <h1>Bem Vindo ao livro de receitas</h1>
    </div>
  );

  return (
    <div className="Home">
      <Header />

      <main>
        {showWelcomeMessage && <WelcomeMessage />}

        <Switch>
          <Route path="/recipes" exact>
            <RecipesList />
          </Route>
          <PrivateRoute path={["/recipes/:id/edit", "/recipes/create"]} exact>
            <Recipe />
          </PrivateRoute>
          <Route path="/recipes/:id" exact>
            <Recipe />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default Home;
