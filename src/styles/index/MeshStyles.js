import styled from 'styled-components'

const MeshWrapper = styled.div`
position: relative; 
height: 90%;
width: 80%;

// background: gray;

display: flex;
justify-content: flex-end;
align-items: center;

@media screen and (max-width: 600px) {  
  height: 100%;
  width: 100%;
}

svg {
    fill: none;
    stroke-width: 0.5px;

    height: 100%;
    // width: 100%;
    margin-right: -2vw;
    max-width: 100%;
    
    @media screen and (max-width: 600px) {  
      margin-right: -25vw;
      max-width: 153%;
      height: 100%;
      margin-top: 10%;
    }

    @media screen and (max-width: 500px) {  
      margin-right: -20vw;
      max-width: 160%;
      height: 100%;
      margin-top: 10%;
    }
  }

  .mesh {
    stroke: #000;
    opacity: 0;
    stroke-dasharray: ${(props) => props.pathLength};
    stroke-dashoffset: ${(props) => props.pathLength};
    animation: appear 0.05s linear forwards, draw 20s ease-in forwards;
  }

  @keyframes appear {
    100% {
      opacity: 1;
    }
  }

  @keyframes draw {
    from {
      stroke-dashoffset: ${(props) => props.pathLength};
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  .fill {
    .cls-1{fill:#e997a8;}.cls-2{fill:#eaada9;}.cls-3{fill:#eba8a2;}.cls-4{fill:#e6a3a4;}.cls-5{fill:#ca6482;}.cls-6{fill:#d3909b;}.cls-7{fill:#e5adad;}.cls-8{fill:#cf7e8e;}.cls-9{fill:#e6aca8;}.cls-10{fill:#ecb6b0;}.cls-11{fill:#e3adac;}.cls-12{fill:#e5a1a5;}.cls-13{fill:#4b0241;}.cls-14{fill:#e4a8a9;}.cls-15{fill:#df959b;}.cls-16{fill:#570240;}.cls-17{fill:#dfa2ad;}.cls-18{fill:#4e0240;}.cls-19{fill:#c77482;}.cls-20{fill:#931247;}.cls-21{fill:#ecb4b8;}.cls-22{fill:#5f1c56;}.cls-23{fill:#b995b8;}.cls-24{fill:#cfa9c0;}.cls-25{fill:#550c42;}.cls-26{fill:#561a50;}.cls-27{fill:#6e174a;}.cls-28{fill:#c2859b;}.cls-29{fill:none;}.cls-30{fill:#c5bfe3;}.cls-31{fill:#d8898f;}.cls-32{fill:#f3bac5;}.cls-33{fill:#eab6bc;}.cls-34{fill:#eab3ba;}.cls-35{fill:#e6a9b3;}.cls-36{fill:#e1a1a6;}.cls-37{fill:#992753;}.cls-38{fill:#d8cad8;}.cls-39{fill:#c9b2bf;}.cls-40{fill:#5d1046;}.cls-41{fill:#e5a8b1;}.cls-42{fill:#ebafaa;}.cls-43{fill:#f8bbca;}.cls-44{fill:#efbabf;}.cls-45{fill:#e9a8a8;}.cls-46{fill:#d4969e;}.cls-47{fill:#edb6bb;}.cls-48{fill:#ecaeab;}.cls-49{fill:#cf9096;}.cls-50{fill:#f9cdd6;}.cls-51{fill:#fdc9d1;}.cls-52{fill:#fecad1;}.cls-53{fill:#fbcad1;}.cls-54{fill:#e7a6a7;}.cls-55{fill:#f7d7e6;}.cls-56{fill:#f9ced0;}.cls-57{fill:#ffd5d8;}.cls-58{fill:#f1c4d1;}.cls-59{fill:#b45a7b;}.cls-60{fill:#cb869b;}.cls-61{fill:#e9abb6;}.cls-62{fill:#ca8c96;}.cls-63{fill:#ab667a;}.cls-64{fill:#f2b4b9;}.cls-65{fill:#f5bec8;}.cls-66{fill:#8c4165;}.cls-67{fill:#490e4a;}.cls-68{fill:#d3cee9;}.cls-69{fill:#d59cad;}.cls-70{fill:#610b41;}.cls-71{fill:#d58f8e;}.cls-72{fill:#56134a;}.cls-73{fill:#e3acb1;}.cls-74{fill:#edadb0;}.cls-75{fill:#d9d0e1;}.cls-76{fill:#b64d6a;}.cls-77{fill:#8e395c;}.cls-78{fill:#e5a39d;}.cls-79{fill:#a05b73;}.cls-80{fill:#de8d96;}.cls-81{fill:#e2989d;}.cls-82{fill:#deadb0;}.cls-83{fill:#f3b7b8;}.cls-84{fill:#e38aa4;}.cls-85{fill:#eeadbb;}.cls-86{fill:#840341;}.cls-87{fill:#eaa6aa;}.cls-88{fill:#4b1149;}.cls-89{fill:#d1949b;}.cls-90{fill:#571044;}.cls-91{fill:#e9b0b0;}.cls-92{fill:#d37d8c;}.cls-93{fill:#300240;}.cls-94{fill:#a96f8c;}.cls-95{fill:#d49aa7;}.cls-96{fill:#f3cbcd;}.cls-97{fill:#c2627f;}.cls-98{fill:#ebb7bb;}.cls-99{fill:#974e74;}.cls-100{fill:#ec8da8;}.cls-101{fill:#d585a5;}.cls-102{fill:#c488aa;}.cls-103{fill:#cf9186;}.cls-104{fill:#e6adc2;}.cls-105{fill:#daa598;}.cls-106{fill:#7a274f;}.cls-107{fill:#bf6271;}.cls-108{fill:#b86290;}.cls-109{fill:#cb82a5;}.cls-110{fill:#e79eb6;}.cls-111{fill:#eab0a5;}.cls-112{fill:#f9c1c7;}.cls-113{fill:#d4788f;}.cls-114{fill:#db7d9d;}.cls-115{fill:#dba9a0;}.cls-116{fill:#e3b6aa;}.cls-117{fill:#80234c;}.cls-118{fill:#2e0341;}.cls-119{fill:#b24165;}.cls-120{fill:#cf96a2;}.cls-121{fill:#e0a9b8;}.cls-122{fill:#923d60;}.cls-123{fill:#fbccd8;}.cls-124{fill:#f7bbc7;}.cls-125{fill:#fad2d4;}.cls-126{fill:#edb5ba;}.cls-127{fill:#c78d9d;}.cls-128{fill:#87365c;}.cls-129{fill:#d58894;}.cls-130{fill:#a85f7a;}.cls-131{fill:#f7cfdd;}.cls-132{fill:#772c59;}.cls-133{fill:#944366;}.cls-134{fill:#f2bcc6;}.cls-135{fill:#dba8b3;}.cls-136{fill:#e8bfc8;}.cls-137{fill:#e9b2b6;}.cls-138{fill:#edb8b9;}.cls-139{fill:#bf637b;}.cls-140{fill:#9c2e60;}.cls-141{fill:#550745;}.cls-142{fill:#720344;}.cls-143{fill:#e2b4b7;}.cls-144{fill:#e0a1b3;}.cls-145{fill:#740240;}.cls-146{fill:#f3b7c3;}.cls-147{fill:#b54d6b;}.cls-148{fill:#ecb3be;}.cls-149{fill:#eaa5b1;}.cls-150{fill:#f1b1af;}.cls-151{fill:#ecacb1;}.cls-152{fill:#da8c8f;}.cls-153{fill:#a8475c;}.cls-154{fill:#f3bcc8;}.cls-155{fill:#dc95a2;}.cls-156{fill:#ebb0ae;}.cls-157{fill:#f4b2bc;}.cls-158{fill:#f8c3cb;}.cls-159{fill:#350441;}.cls-160{fill:#663869;}.cls-161{fill:#582a60;}.cls-162{fill:#5c2a5f;}.cls-163{fill:#48164a;}.cls-164{fill:#56275c;}.cls-165{fill:#2a0341;}.cls-166{fill:#2d0441;}.cls-167{fill:#2f0440;}.cls-168{fill:#43174e;}.cls-169{fill:#45124c;}.cls-170{fill:#3d0f48;}.cls-171{fill:#360541;}.cls-172{fill:#663b6a;}.cls-173{fill:#2b0442;}.cls-174{fill:#2b0441;}.cls-175{fill:#3a0d48;}.cls-176{fill:#350643;}.cls-177{fill:#2f0441;}.cls-178{fill:#4d1d54;}.cls-179{fill:#2a0240;}.cls-180{fill:#3d104c;}.cls-181{fill:#cd7d84;}.cls-182{fill:#e9a39b;}.cls-183{fill:#eaa6a1;}.cls-184{fill:#efa8a5;}.cls-185{fill:#f0aea8;}.cls-186{fill:#fababc;}.cls-187{fill:#f4c3c4;}.cls-188{fill:#e3a097;}.cls-189{fill:#cf617c;}.cls-190{fill:#b45f73;}.cls-191{fill:#370541;}.cls-192{fill:#2d0340;}.cls-193{fill:#3b0c45;}.cls-194{fill:#eeb5b1;}.cls-195{fill:#d68f8d;}.cls-196{fill:#c2737e;}.cls-197{fill:#cb6979;}.cls-198{fill:#ce8178;}.cls-199{fill:#cf837a;}.cls-200{fill:#c7807a;}.cls-201{fill:#d98a83;}.cls-202{fill:#c27374;}.cls-203{fill:#ae525d;}.cls-204{fill:#e9b8b4;}.cls-205{fill:#aa5c73;}.cls-206{fill:#bc576e;}.cls-207{fill:#702756;}.cls-208{fill:#b65470;}.cls-209{fill:#d79a8c;}.cls-210{fill:#e0a292;}.cls-211{fill:#d2767e;}.cls-212{fill:#db887f;}.cls-213{fill:#edada2;}.cls-214{fill:#dba497;}.cls-215{fill:#d7aaa9;}.cls-216{fill:#d2a0a0;}.cls-217{fill:#c1868b;}.cls-218{fill:#d99cab;}.cls-219{fill:#e1b6a1;}.cls-220{fill:#c37997;}.cls-221{fill:#c9889a;}.cls-222{fill:#cf89a2;}.cls-223{fill:#ca8a86;}.cls-224{fill:#c27f97;}.cls-225{fill:#bc7c8a;}.cls-226{fill:#3c0b48;}.cls-227{fill:#d28a86;}.cls-228{fill:#e9bbad;}.cls-229{fill:#d9a295;}.cls-230{fill:#d6a095;}.cls-231{fill:#c57e7a;}.cls-232{fill:#e6bbac;}.cls-233{fill:#e0b5ac;}.cls-234{fill:#c58378;}.cls-235{fill:#c07480;}.cls-236{fill:#2aff84;}.cls-237{fill:#c2757c;}.cls-238{fill:#bf90a2;}.cls-239{fill:#ca7c8c;}.cls-240{fill:#af5471;}.cls-241{fill:#f4b6b8;}.cls-242{fill:#390a43;}.cls-243{fill:#390942;}.cls-244{fill:#ecb0b6;}.cls-245{fill:#310542;}.cls-246{fill:#c2727d;}.cls-247{fill:#4b0f44;}.cls-248{fill:#350943;}.cls-249{fill:#2b0241;}.cls-250{fill:#380441;}.cls-251{fill:#2e0340;}.cls-252{fill:#5d2453;}.cls-253{fill:#aa6d8f;}.cls-254{fill:#d96f88;}.cls-255{fill:#e782a7;}.cls-256{fill:#ea9e9d;}.cls-257{fill:#d57d9b;}.cls-258{fill:#e3a2a8;}.cls-259{fill:#e9adaa;}.cls-260{fill:#ed93af;}.cls-261{fill:#efbbc5;}.cls-262{fill:#f5babb;}.cls-263{fill:#da898e;}.cls-264{fill:#f4b8bb;}.cls-265{fill:#f2cddb;}.cls-266{fill:#d79197;}.cls-267{fill:#c34c68;}.cls-268{fill:#df9896;}.cls-269{fill:#c96679;}.cls-270{fill:#c5687b;}.cls-271{fill:#dc9a95;}.cls-272{fill:#e8b4b3;}.cls-273{fill:#dfa09d;}.cls-274{fill:#dea4a1;}.cls-275{fill:#e8ada3;}.cls-276{fill:#efc2c4;}.cls-277{fill:#dbaba3;}.cls-278{fill:#edb7bf;}.cls-279{fill:#f2b4c0;}.cls-280{fill:#fdc4cb;}.cls-281{fill:#e5a8b0;}.cls-282{fill:#d9ada9;}.cls-283{fill:#eab6a8;}.cls-284{fill:#e0978c;}.cls-285{fill:#7b234c;}.cls-286{fill:#f8bec5;}.cls-287{fill:#daa492;}.cls-288{fill:#944970;}.cls-289{fill:#92476b;}.cls-290{fill:#983359;}.cls-291{fill:#87335b;}.cls-292{fill:#ecb1a4;}.cls-293{fill:#3e0844;}.cls-294{fill:#5b2b5e;}.cls-295{fill:#3e0741;}.cls-296{fill:#44124a;}.cls-297{fill:#f7bbc2;}.cls-298{fill:#3a0541;}.cls-299{fill:#490340;}.cls-300{fill:#2e0240;}.cls-301{fill:#ad708c;}.cls-302{fill:#410c43;}.cls-303{fill:#4f1a4e;}.cls-304{fill:#3a0944;}.cls-305{fill:#5f2b5c;}.cls-306{fill:#2f0541;}.cls-307{fill:#dba3a9;}.cls-308{fill:#521c51;}.cls-309{fill:#380641;}.cls-310{fill:#51184d;}.cls-311{fill:#400841;}.cls-312{fill:#ba7f97;}.cls-313{fill:#c4706f;}.cls-314{fill:#c07d97;}.cls-315{fill:#e29891;}.cls-316{fill:#efb4ad;}.cls-317{fill:#e4a297;}.cls-318{fill:#8d1749;}.cls-319{fill:#d86286;}.cls-320{fill:#d97082;}.cls-321{fill:#dd8e82;}.cls-322{fill:#80294e;}.cls-323{fill:#ae525f;}.cls-324{fill:#ecbfb3;}
    @keyframes fade {
        from {
            opacity: 0;
        } to {
            opacity: 1;
        }
    }
    animation: fade 1.5s ease-in forwards;
    animation-delay: 4s;
    opacity: 0;
  }

`
export default MeshWrapper