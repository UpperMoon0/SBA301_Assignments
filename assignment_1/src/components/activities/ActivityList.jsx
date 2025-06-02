import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Button,
    IconButton,
    Chip,
    Box
} from "@mui/material";
import { useState } from "react";
import { Edit, Delete, Add } from '@mui/icons-material';

function ActivityList({ activities, onEdit, onDelete, onCreate }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getTypeColor = (type) => {
        const colors = {
            'Social': 'primary',
            'Creative': 'secondary',
            'Educational': 'success',
            'Physical': 'warning',
            'Routine': 'info'
        };
        return colors[type] || 'default';
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Activity Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={onCreate}
                    sx={{ minWidth: 150 }}
                >
                    Create Activity
                </Button>
            </Box>

            <Paper sx={{
                width: '100%',
                borderRadius: 3,
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>No</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Activity Name</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Duration (min)</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Age Group</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Created Date</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activities
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((activity, index) => (
                                    <TableRow key={activity.id} hover>
                                        <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body2" fontWeight="medium">
                                                {activity.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {activity.description}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip 
                                                label={activity.type} 
                                                color={getTypeColor(activity.type)}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="center">{activity.duration}</TableCell>
                                        <TableCell align="center">{activity.ageGroup}</TableCell>
                                        <TableCell align="center">{activity.createdDate}</TableCell>
                                        <TableCell align="center">
                                            <IconButton 
                                                color="primary" 
                                                onClick={() => onEdit(activity)}
                                                size="small"
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton 
                                                color="error" 
                                                onClick={() => onDelete(activity.id)}
                                                size="small"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={activities.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

export default ActivityList;