// react-native-web의 create-react-app은 index.ts를 읽기 전에 index.web.ts를 먼저 읽게 된다.
// 웹과 관련된 코드를 여기 넣으면 된다.

export { BrowserRouter as Router, Route, Switch, Redirect, withRouter} from 'react-router-dom';

