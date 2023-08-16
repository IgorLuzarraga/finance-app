import DashboardBox from "@/components/DashBoardBox"
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api"
import { useMemo } from "react"
import { DataGrid, GridCellParams } from "@mui/x-data-grid"
import BoxHeader from "@/components/BoxHeader"
import { Box, Typography, useTheme } from "@mui/material"
import FlexBetween from "@/components/FlexBetween"
import { Cell, Pie, PieChart } from "recharts"

const Row3 = () => {
    const { palette } = useTheme()
    const pieColors = [palette.primary[800], palette.primary[500]]
    const { data: kpiData, isError: isErrorKpis, isLoading: isLoadingKpis } = useGetKpisQuery()
    const { data: productData, isError: isErrorProducts, isLoading: isLoadingProducts } = useGetProductsQuery()
    const { data: transactionData, isError: isErrorTransactions, isLoading: isLoadingTransactions } = useGetTransactionsQuery()

    const pieChartData = useMemo(() => {
        if (kpiData) {
            const totalExpenses = kpiData[0].totalExpenses

            return Object.entries(kpiData[0].expensesByCategory).map(
                ([key, value]) => {
                    return [
                        {
                            name: key,
                            value: value,
                        },
                        {
                            name: `${key} of Total`,
                            value: totalExpenses - value
                        }
                    ]
                }
            )
        }
    }, [kpiData]);

    const productColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "expense",
            headerName: "Expense",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
    ]

    const transactionColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "buyer",
            headerName: "Buyer",
            flex: 0.67,
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.35,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "productIds",
            headerName: "Count",
            flex: 0.1,
            renderCell: (params: GridCellParams) =>
                (params.value as Array<string>)?.length,
        },
    ]

    if ((isLoadingKpis) && (isLoadingProducts) && (isLoadingTransactions)) {
        return <div>Loading...</div>;
    }

    if ((isErrorKpis) || (isErrorProducts) || (isErrorTransactions)) {
        return <div>Error fetching data</div>;
    }

    return (
        <>
            <DashboardBox gridArea="g">
                <BoxHeader
                    title="List of Products"
                    sideText={`${productData?.length} products`}
                />
                <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height="75%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            visibility: "hidden"
                        }
                    }}
                >
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={productData || []}
                        columns={productColumns}
                    />
                </Box>
            </DashboardBox>

            <DashboardBox gridArea="h">
                <BoxHeader
                    title="Recent Orders"
                    sideText={`${transactionData?.length} latest transactions`}
                />
                <Box
                    mt="1rem"
                    p="0 0.5rem"
                    height="80%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            visibility: "hidden"
                        }
                    }}
                >
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={transactionData || []}
                        columns={transactionColumns}
                    />
                </Box>
            </DashboardBox>

            <DashboardBox gridArea="i">
                <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />

                <FlexBetween mt="0.8rem" gap="0.5rem" p="0 1rem" textAlign="center">
                    {pieChartData?.map((data, i) => (
                        // <Box key={`${data[0].name}-${i}`} gap={12} display="flex" flexDirection: "column" gap="0.8rem">
                        <Box
                            key={`${data[0].name}-${i}`}
                            display="flex"
                            flexDirection="column"
                            gap="0.8rem"
                        >
                            <PieChart width={110} height={70}>
                                <Pie
                                    stroke="none"
                                    data={data}
                                    innerRadius={20}
                                    outerRadius={35}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {data.map((data, index) => (
                                        <Cell key={`cell-${data.name}-${index}`} fill={pieColors[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <Typography variant="h5">{data[0].name}</Typography>
                        </Box>
                    ))}
                </FlexBetween>
            </DashboardBox>

            <DashboardBox gridArea="j">
                <BoxHeader
                    title="Overall Summary and Explanation Data"
                    sideText="+15%"
                />
                <Box
                    height="15px"
                    margin="1.25rem 1rem 0.4rem 1rem"
                    bgcolor={palette.primary[800]}
                    borderRadius="1rem"
                >
                    <Box
                        height="15px"
                        bgcolor={palette.primary[600]}
                        borderRadius="1rem"
                        width="40%"
                    >
                    </Box>
                </Box>
                <Typography margin="0 1rem" variant="h6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In maxime fuga quaerat quod expedita? Autem numquam laboriosam dolor quo reprehenderit porro iure quidem consectetur dolore? Magni eos voluptas eligendi excepturi!
                </Typography>
            </DashboardBox>
        </>
    )
}

export default Row3