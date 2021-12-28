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
                            <Link to="#">Applications mobiles</Link>
                            <Link to="#">Applications de bureau</Link>
                            <Link to="#">Intégrations</Link>
                            <Link to="#">API / Webhooks</Link>
                            <Link to="#">Etat du service</Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} md={2} sm={4} m='auto'>
                        <Typography variant="subtitle2" m='auto' className={classes.footerTitle}>Ressources</Typography>
                        <Grid item xs={12} className={classes.footerGrid}>
                            <Link to="#">Nos clients</Link>
                            <Link to="#">Livres blancs</Link>
                            <Link to="#">Evénements</Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} md={2} sm={4} m='auto'>
                        <Typography variant="subtitle2" className={classes.footerTitle}>informations</Typography>
                        <Grid item xs={12} className={classes.footerGrid}>
                            <Link to="#">Tarifs</Link>
                            <Link to="#">Comparatifs</Link>
                            <Link to="#">Secteurs d'activité</Link>
                            <Link to="#">Meilleurs logiciels</Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} md={2} sm={4} m='auto'>
                        <Typography variant="subtitle2" className={classes.footerTitle}>Liens</Typography>
                        <Grid item xs={12} className={classes.footerGrid}>
                            <Link to="#">Blog</Link>
                            <Link to="#">Vidéos</Link>
                            <Link to="#">Presse</Link>
                            <Link to="#">Base de connaissances</Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} md={2} sm={4} m='auto'>
                        <Typography variant="subtitle2" m='auto' className={classes.footerTitle}>À propos</Typography>
                        <Grid item xs={12} className={classes.footerGrid}>
                            <Link to="#">Contactez-nous</Link>
                            <Link to="#">Qui sommes-nous ?</Link>
                            <Link to="#">Nous recrutons</Link>
                            <Link to="#">Sécurité</Link>
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