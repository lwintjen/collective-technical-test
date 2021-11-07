import { Dispatch } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridCellParams,
} from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { formatNumber } from "../utils/formatNumber";
import { setLikedCoins } from "../store/actionCreators";
import { CoinCapURIResponse } from "../types/currency";
import store from "../store";

interface Props {
  displayAllItems: boolean;
  coins: CoinCapURIResponse[];
  setCoins: (coins: CoinCapURIResponse[]) => void;
}

const useStyles = makeStyles({
  root: {
    "& .super-app.negative": {
      color: "rgba(157, 255, 118, 0.49)",
      fontWeight: "600",
    },
    "& .super-app.positive": {
      color: "#d47483",
      fontWeight: "600",
    },
  },
});

const formatRows = (
  likedCoins: string[],
  coins: CoinCapURIResponse[],
  displayAll: boolean
): GridRowsProp => {
  const res = coins.map((c) => {
    return {
      name: c.name,
      id: c.id,
      rank: Number(c.rank),
      symbol: c.symbol,
      changePercent24Hr: formatNumber(c.changePercent24Hr),
      priceUsd: Number(c.priceUsd).toFixed(2),
      supply: Number(c.supply).toFixed(2),
      liked: likedCoins.find((coinID) => coinID === c.id) !== undefined,
    };
  });
  if (!displayAll) return res.filter((c) => c.liked);
  return res;
};

const CoinsList: React.FC<Props> = (props) => {
  const { coins, displayAllItems, setCoins } = props;
  const likedCoins = store.getState().likedCoins;
  const classes = useStyles();
  const dispatch: Dispatch<any> = useDispatch();

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 150, sortable: false },
    {
      field: "id",
      headerName: "Id",
      width: 150,
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "rank",
      headerName: "Rank",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "symbol",
      headerName: "Symbol",
      width: 150,
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "changePercent24Hr",
      headerName: "Rate (last 24hrs)",
      width: 200,
      align: "center",
      headerAlign: "center",
      cellClassName: (params: GridCellParams<string>) =>
        clsx("super-app", {
          negative: params.value[0] !== "-",
          positive: params.value[0] === "-",
        }),
    },
    {
      field: "priceUsd",
      headerName: "Price ($)",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "supply",
      headerName: "Supply",
      width: 200,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "liked",
      headerName: "Liked",
      width: 150,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        const isLiked = params.getValue(params.row.id, "liked");
        return (
          <Box
            sx={{
              display: "flex",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              params.row.liked = !isLiked;
              dispatch(setLikedCoins(params.row.id));
              setCoins([...coins]);
            }}
          >
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "100%" }} className={classes.root}>
      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={formatRows(likedCoins, coins, displayAllItems)}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default CoinsList;
