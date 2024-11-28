# Her er loggen min og todelidolisten min

TEST

## 17/09/24
Jeg lagde logg. Så også på den offisielle studietidnettsiden og prøvde å få en oversikt over hva jeg må lage.
Lagde en .gitignore og oppdaterte README.md

## 20/09/24
Jeg flyttet personlisten min vekk fra index.html, opprettet en side for aktivitetsliste og fikk inn informasjon på den. 
Jeg må få inn noen inputfelt der sånn at administratorer kan opprette aktiviteter. Jeg må også lage sletteknapper til aktiviteter og brukere, og en godkjenningsknapp for aktiviteter.

## 25/09/24
Skrev en to do list. Prøvde å gi admins tilgang til å oppdatere statusen til aktiviteter. Ikke i mål enda. 

## 27/09/24
Admins kan nå oppdatere statusen til aktiviteter. 

## 01/10/24
Jeg flyttet adminsidene til en egen mappe, og jeg begynte på en funksjon for å la brukere opprette egne aktiviteter

## 04/10/24
Nå er det mulig for brukere å opprette aktiviteter. Jeg har også passet på at datoen er formatert rett og satt til Oslo sin tidssone.
Ryddet i funksjoner for å oppdatere aktiviteter

## 14/10/24
Nå er begynnelsen på et login system på plass. Sjekker fortsatt ikke om du er admin, men det kan jeg gjøre senere.

## 16/10/24
Nå redirecter index.html deg for å få deg til å logge inn. /admin/[index.html] sjekker om du er admin. Ingen andre admin sider gjør det.

## 17/10/24
Nå sjekker alle sider om du har logget inn. Alle adminsider sjekker om du er admin.

## 22/10/24
Jeg har gjort at hver bruker nå kan se sin individuelle aktivitetsliste. Jeg har også prøvd å gjøre registreringen av aktiviteter mer sikker ved å ikke la brukere selv bestemme status på aktiviteter.
Dette trenger fortsatt arbeid.

## 25/10/24
Brukere kan nå ikke lenger bestemme status på nye aktiviteter selv. 
Nå kan admins legge til nye brukere *med passord*. Funksjonene /promoteuser/ og /demoteuser/ trenger mer arbeid.

## 30/10/24
Nå har jeg fikset /promoteuser.
Neste gang burde jeg gjøre at admins kan legge til aktiviteter på vegne av elever.

## 30/10/24
Nå har jeg fikset /promoteuser.
Neste gang burde jeg gjøre at admins kan legge til aktiviteter på vegne av elever.

## 11/11/24
Bugfix

## 13/11/24
Jeg har sørget for at man må være logget inn og admin dersom man skal få gjennomføre enhver get og post request med mulig sensitiv informasjon.

