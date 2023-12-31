import BoxHeader from "@/components/BoxHeader"
import DashboardBox from "../../components/DashboardBox"
import FlexBetween from "@/components/FlexBetween"
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api"
import { Box, Typography, useTheme } from "@mui/material"
import { useMemo } from "react"
import { CartesianGrid, LineChart, Tooltip, ResponsiveContainer, XAxis, YAxis, Line, PieChart, Pie, Cell, ScatterChart, ZAxis, Scatter } from "recharts"
import { PaletteType } from "@/types/paletteTypes"

const pieData = [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 400 },
];

const Row2 = () => {
    const { palette } = useTheme()

    // Ensure the palette object adheres to the Palette interface
    const typedPalette = palette as unknown as { primary: PaletteType, tertiary: PaletteType };

    const pieColors = [typedPalette.primary[800], typedPalette.primary[300]];

    // const pieColors = [palette.primary[800], palette.primary[300]]
    const { data: operationalData, isError: isErrorKpis, isLoading: isLoadingKpis } = useGetKpisQuery()
    const { data: productData, isError: isErrorProducts, isLoading: isLoadingProducts } = useGetProductsQuery()

    const nonAndOperationalExpenses = useMemo(() => {
        return (
            operationalData &&
            operationalData[0].monthlyData.map(
                ({ month, operationalExpenses, nonOperationalExpenses }) => {
                    return {
                        name: month.substring(0, 3),
                        "Operational Expenses": operationalExpenses, // Corrected property name
                        "Non Operational Expenses": nonOperationalExpenses, // Corrected property name
                    };
                }
            )
        );
    }, [operationalData]);

    const productPriceAndExpenseData = useMemo(() => {
        return (
            productData &&
            productData.map(({ _id, price, expense }) => {
                return {
                    id: _id,
                    price: price,
                    expense: expense,
                }
            })
        )
    }, [productData])

    if ((isLoadingKpis) && (isLoadingProducts)) {
        return <div>Loading...</div>;
    }

    if ((isErrorKpis) || (isErrorProducts)) {
        return <div>Error fetching data</div>;
    }

    return (
        <>
            <DashboardBox gridArea="d">
                <BoxHeader
                    title="Operational vs Non-Operational Expenses"
                    sideText="+4%"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={nonAndOperationalExpenses}
                        margin={{
                            top: 20,
                            right: 0,
                            left: -10,
                            bottom: 55,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                        />
                        <YAxis
                            yAxisId="left"
                            orientation="left"
                            tickLine={false}
                            axisLine={false}
                            style={{ fontSize: "10px" }}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickLine={false}
                            axisLine={false}
                            style={{ fontSize: "10px" }}
                        />
                        <Tooltip />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="Non Operational Expenses"
                            // stroke={palette.tertiary[500]}
                            stroke={typedPalette.tertiary[500]}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="Operational Expenses"
                            stroke={palette.primary.main}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>

            <DashboardBox gridArea="e">
                <BoxHeader title="Campaigns and Targets" sideText="+4%" />
                <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
                    <PieChart
                        width={110}
                        height={100}
                        margin={{
                            top: 0,
                            right: -10,
                            left: 10,
                            bottom: 0,
                        }}
                    >
                        <Pie
                            stroke="none"
                            data={pieData}
                            innerRadius={18}
                            outerRadius={38}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {pieData.map((data, index) => (
                                <Cell key={`cell-${data.name}-${index}`} fill={pieColors[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                    <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
                        <Typography variant="h5">Target Sales</Typography>
                        {/* <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}> */}
                        <Typography m="0.3rem 0" variant="h3" color={typedPalette.primary[300]}>
                            83
                        </Typography>
                        <Typography variant="h6">
                            finance goals of the campaign that is desired
                        </Typography>
                    </Box>
                    <Box flexBasis="40%">
                        <Typography variant="h5">Losses in Revenue</Typography>
                        <Typography variant="h6">Losses are down 25%</Typography>
                        <Typography mt="0.4rem" variant="h5">Profit Margins</Typography>
                        <Typography variant="h6">
                            Margins are up by 30% from last month.
                        </Typography>
                    </Box>
                </FlexBetween>
            </DashboardBox>

            <DashboardBox gridArea="f">
                <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 25,
                            bottom: 40,
                            left: -10,
                        }}
                    >
                        <CartesianGrid stroke={palette.grey[800]} />
                        <XAxis
                            type="number"
                            dataKey="price"
                            name="price"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={(v) => `$${v}`}
                        />
                        <YAxis
                            type="number"
                            dataKey="expense"
                            name="expense"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={(v) => `$${v}`}
                        />
                        <ZAxis type="number" range={[20]} />
                        <Tooltip formatter={(v) => `$${v}`} />
                        <Scatter
                            name="Product Expenses Ratio"
                            data={productPriceAndExpenseData}
                            // fill={palette.tertiary[500]}
                            fill={typedPalette.tertiary[500]}
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    )
}

export default Row2