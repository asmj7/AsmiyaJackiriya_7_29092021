import React from "react";
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { fontFamily } from "@mui/system";

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
        Link: {
            underline: 'none'
        }
    })

    const classes = useStyles();

    return (
        <>
            <Box container className={classes.footerContainer}>
                <Grid container>
                    <Grid item xs={8} md={2} sm={4} m='auto'>
                        <Typography variant="subtitle2" m='auto'>Produit</Typography>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Applications mobiles</Link>
                        </Grid>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Applications de bureau</Link>
                        </Grid>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Intégrations</Link>
                        </Grid>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">API / Webhooks</Link>
                        </Grid>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Etat du service</Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} md={2} sm={4} m='auto'>
                        <Typography variant="subtitle2" m='auto'>Ressources</Typography>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Nos clients</Link>
                        </Grid>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Livres blancs</Link>
                        </Grid>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Evénements</Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} md={2} sm={4} m='auto'>
                        <Typography variant="subtitle2" m='auto'>informations</Typography>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Tarifs</Link>
                        </Grid>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Comparatifs</Link>
                        </Grid>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Secteurs d'activité</Link>
                        </Grid>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Meilleurs logiciels</Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} md={2} sm={4} m='auto'>
                        <Typography variant="subtitle2" m='auto'>Liens</Typography>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Blog</Link>
                        </Grid>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Vidéos</Link>
                        </Grid>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Presse</Link>
                        </Grid>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Base de connaissances</Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} md={2} sm={4} m='auto'>
                        <Typography variant="subtitle2" m='auto'>À propos</Typography>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Contactez-nous</Link>
                        </Grid>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Qui sommes-nous ?</Link>
                        </Grid>
                        <Grid item xs={12} mt='10px'>
                            <Link href="#">Nous recrutons</Link>
                        </Grid>
                        <Grid item xs={12} mt='10px'>
                            <Link sx={{fontFamily: "sans-sérif"}} href="#">Sécurité</Link>
                        </Grid>
                    </Grid>
                </Grid >
                <Box mt='60px' sx={{ display: 'flex',flexDirection: 'row',justifyContent: 'space-evenly'  }}>
                    <TwitterIcon />
                    <FacebookIcon />
                    <InstagramIcon />
                </Box>
            </Box>











        </>
    )
}