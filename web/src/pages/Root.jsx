import PagesPromotionSearch from "./promotion/Search/Search";
import PagesPromotionForm from "./promotion/Form/Form";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./Root.module.css";
const Root = () => {
  return (
    <div className={styles.root}>
      <Router>
        <Switch>
          <Route path="/create" component={PagesPromotionForm} />
          <Route path="/edit/:id" component={PagesPromotionForm} />
          <Route path="/" component={PagesPromotionSearch} />
        </Switch>
      </Router>
    </div>
  );
};
export default Root;
