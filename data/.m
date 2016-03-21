# funkcija z = normalna(mu,sigma,k)
#
# vrne k naključnih stolpcev velikosti 2, 
# porazdeljenih po N(mu,sigma)

function Z = normalna(k,mu,sigma)
    U = rand(2,k);
    Z = ([1;1]*sqrt(-2*log(U(1,:)))).*[cos(2*pi*U(2,:)); sin(2*pi*U(2,:))];
    Z = mu*ones(1,k) + sigma^0.5*Z;
endfunction

%!demo
%! k=1000;
%! A = [5 2; 2 5]; mu = [1;2];
%! x = normalna(k,mu,A);
%! plot(x(1,:),x(2,:),'.'); hold on
%! fi = linspace(0,2*pi);
%! Z = A*[cos(fi);sin(fi)]+mu;
%! plot(Z(1,:),Z(2,:),'r'); hold off
%! # normalno poradeljene točke v ravnini