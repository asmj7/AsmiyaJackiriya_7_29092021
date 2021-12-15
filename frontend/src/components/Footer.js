import React from "react";
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {

    const useStyles = makeStyles({
        footerContainer: {
            backgroundColor: '#101831',
            color: 'white',
            textDecoration: 'none',
            alignItems: 'flex-start',
            paddingTop: '20px',
            paddingBottom: '80px'
        },
        grid: {
            color: 'white',
            textDecoration: 'none',
            alignItems: 'flex-start'
        },
        footerTitle: {
            color: '#ED83D0',
            margin: '20px'
        },
        footerGrid: {
            "& > *": {
                color: "white",
                textDecoration: 'none',
                marginTop: "20px",
                display: 'grid',
                rowGap:'20px'
            }
        }
    })

    const classes = useStyles();

    return (
        <>
            <Box container className={classes.footerContainer}>
                <Grid container>
                    <Grid item xs={8} md={2} sm={4} m='auto'>
                        <Typography variant="subtitle2" m='auto' className={classes.footerTitle}>Produit</Typography>
                        <Grid item xs={12} className={classes.footerGrid}>
                            <Link href="#">Applications mobiles</Link>
                            <Link href="#">Applications de bureau</Link>
                            <Link href="#">Intégrations</Link>
                            <Link href="#">API / Webhooks</Link>
                            <Link href="#">Etat du service</Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} md={2} sm={4} m='auto'>
                        <Typography variant="subtitle2" m='auto' className={classes.footerTitle}>Ressources</Typography>
                        <Grid item xs={12} className={classes.footerGrid}>
                            <Link href="#">Nos clients</Link>
                            <Link href="#">Livres blancs</Link>
                            <Link href="#">Evénements</Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} md={2} sm={4} m='auto'>
                        <Typography variant="subtitle2" className={classes.footerTitle}>informations</Typography>
                        <Grid item xs={12} className={classes.footerGrid}>
                            <Link href="#">Tarifs</Link>
                            <Link href="#">Comparatifs</Link>
                            <Link href="#">Secteurs d'activité</Link>
                            <Link href="#">Meilleurs logiciels</Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} md={2} sm={4} m='auto'>
                        <Typography variant="subtitle2" className={classes.footerTitle}>Liens</Typography>
                        <Grid item xs={12} className={classes.footerGrid}>
                            <Link href="#">Blog</Link>
                            <Link href="#">Vidéos</Link>
                            <Link href="#">Presse</Link>
                            <Link href="#">Base de connaissances</Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} md={2} sm={4} m='auto'>
                        <Typography variant="subtitle2" m='auto' className={classes.footerTitle}>À propos</Typography>
                        <Grid item xs={12} className={classes.footerGrid}>
                            <Link href="#">Contactez-nous</Link>
                            <Link href="#">Qui sommes-nous ?</Link>
                            <Link href="#">Nous recrutons</Link>
                            <Link href="#">Sécurité</Link>
                        </Grid>
                    </Grid>
                </Grid >
                <Box mt='60px' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TwitterIcon />
                    <FacebookIcon />
                    <InstagramIcon />
                </Box>
            </Box>











        </>
    )
}