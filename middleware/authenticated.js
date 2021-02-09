export default function ({ $auth, redirect, route }) {
    if(!$auth.state.user && $auth.loggedIn){
        $auth.logout();
        //return redirect('/login');
    }


    /*if(route.path=="/login"){
        return redirect(`/${$auth.user.tipo}`);
    }*/


    /*if($auth.state.loggedIn && route.path == '/login'){
        return redirect(`/${$auth.state.user.tipo}`);

    }*/

    if($auth.loggedIn && !route.path.includes($auth.user.tipo)){
            return redirect(`/${$auth.user.tipo}`);
    }
}
  