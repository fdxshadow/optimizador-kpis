export default function ({ $auth, redirect, route, store }) {
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
        if($auth.user.tipo=='gerente' && !!store.state.obraSelect){
            return redirect(`/${$auth.user.tipo}/empresa/${store.state.obraSelect}`);
        }
            return redirect(`/${$auth.user.tipo}`);
    }


    if($auth.user.tipo=='gerente' && !store.state.obraSelect){
        return redirect(`/${$auth.user.tipo}`);
    }
}
  