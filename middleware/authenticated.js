export default function ({ $auth, redirect, route, store }) {
    if(!$auth.state.user && $auth.loggedIn){
        $auth.logout();
        //return redirect('/login');
    }

    if($auth.loggedIn && !route.path.includes($auth.user.tipo)){
        if($auth.user.tipo=='gerente' && !!store.state.obraSelect){
            return redirect(`/${$auth.user.tipo}/empresa/${store.state.obraSelect}`);
        }
            return redirect(`/${$auth.user.tipo}`);
    }

}
  