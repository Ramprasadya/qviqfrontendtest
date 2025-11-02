"use client";
import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { clientUrl, serverUrl } from "../../config";
import { HiOutlineTruck } from "react-icons/hi";
import Link from "next/link";

const ManageProductsByMaterial = () => {
  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" mt={4}>
          Manage Products Page
        </Typography>
        <Grid container justifyContent="center" mt={4} spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <HiOutlineTruck />
                <Typography variant="h5">Manage PVC CARD</Typography>
                <Typography variant="body2">View all PVC CARD.</Typography>
                <Button
                  component={Link}
                  href="/manageProducts/pvc"
                  variant="contained"
                  color="primary"
                >
                  Go to PVC
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <HiOutlineTruck />
                <Typography variant="h5">Manage Metal CARD</Typography>
                <Typography variant="body2">View all Metal CARD.</Typography>
                <Button
                  component={Link}
                  href="/manageProducts/metal"
                  variant="contained"
                  color="primary"
                >
                  Go to Metal
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <HiOutlineTruck />
                <Typography variant="h5">Manage Hybrid CARD</Typography>
                <Typography variant="body2">View all Hybrid CARD.</Typography>
                <Button
                  component={Link}
                  href="/manageProducts/hybrid"
                  variant="contained"
                  color="primary"
                >
                  Go to Hybrid
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Button href="/addProduct" variant="contained" color="primary">
          Add Product
        </Button>
      </Container>
    </div>
  );
};

export default ManageProductsByMaterial;
