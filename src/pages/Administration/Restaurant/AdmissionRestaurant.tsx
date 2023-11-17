import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import IRestaurant from "../../../interfaces/IRestaurant";
import { Link } from "react-router-dom";

const AdmissionRestaurant = () => {
    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/v2/restaurantes/')
            .then(response => setRestaurants(response.data))
    }, []);

    const deleted = (restaurantToBeDeleted: IRestaurant) => {
        axios.delete(`http://localhost:8000/api/v2/restaurantes/${restaurantToBeDeleted.id}/`)
        .then(() => {
            const listRestaurant = restaurants.filter(restaurant => restaurant.id !== restaurantToBeDeleted.id)
            setRestaurants([ ...listRestaurant ])
        });
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurants.map(restaurant => <TableRow key={restaurant.id}>
                        <TableCell>
                            {restaurant.nome}
                        </TableCell>
                        <TableCell>
                            [ <Link to={`/admin/restaurantes/${restaurant.id}`}>Editar</Link> ]
                        </TableCell>
                        <TableCell>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => deleted(restaurant)}
                            >
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdmissionRestaurant;