import React from "react";
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Footer() {

    return (
        <>
            <Grid container>
                <Grid item>
                    <Typography variant="subtitle2">Produit</Typography>
                    <Link href="#">Applications mobiles</Link>
                    <Link href="#">Applications de bureau</Link>
                    <Link href="#">Intégrations</Link>
                    <Link href="#">API / Webhooks</Link>
                    <Link href="#">Etat du service</Link>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2">Ressources</Typography>
                    <Link href="#">Nos clients</Link>
                    <Link href="#">Livres blancs</Link>
                    <Link href="#">Evénements</Link>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2">informations</Typography>
                    <Link href="#">Tarifs</Link>
                    <Link href="#">Comparatifs</Link>
                    <Link href="#">Secteurs d'activité</Link>
                    <Link href="#">Meilleurs logiciels</Link>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2">Liens</Typography>
                    <Link href="#">Blog</Link>
                    <Link href="#">Vidéos</Link>
                    <Link href="#">Presse</Link>
                    <Link href="#">Base de connaissances</Link>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2">À propos</Typography>
                    <Link href="#">Contactez-nous</Link>
                    <Link href="#">Qui sommes-nous ?</Link>
                    <Link href="#">Nous recrutons</Link>
                    <Link href="#">Sécurité</Link>
                </Grid>
            </Grid>











        </>
    )
}