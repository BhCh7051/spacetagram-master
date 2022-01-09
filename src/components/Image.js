import React from "react";
import "../css/Image.css";
import {Button, Avatar, Checkbox, Tooltip} from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ContentCopyIcon from '@material-ui/icons/FileCopy';
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

function Image({ data }) {
    const downloadFile = () => {
        window.location.href = data.downloadUrl
    }
    const downloadImage = async () => {
        try {
            const response = await fetch(data.downloadUrl);
            const blob = await response.blob();
            // convert the blob to Data String Url
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.style = "display: none";
            document.body.appendChild(a);
            a.href = url;
            a.download = data.title;
            a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Something Went Wrong... Unable to Download Image");
    }
  };
  const [selected, setSelected] = React.useState(false);
  return (
    <div className="image">
      <div className="image__header">
        <Button
          id="Favorite"
          // onClick={handleFavoriteSwitch}
          variant="contained"
          size="small"
          disableElevation
          className="image__button"
          // selected={selected}
          className={selected ? "like" : ""}
          onClick={() => {
            setSelected(!selected);
            var element = document.getElementById("Favorite");
            if (selected) element.classList.add("like");
            else element.classList.remove("like");
          }}
        >
          <FavoriteIcon id="Favorite" fontSize="small" />
        </Button>
        &nbsp; &nbsp; &nbsp;
          {/*<Tooltip  placement="top" title="✔ Copied to Clipboard">*/}
        <Button
            variant="contained"
            size="small"
            disableElevation
            className="image__button"
            title="Copy to Clipboard"
            onClick={() => {
                navigator.clipboard.writeText(data.downloadUrl)
            }}
        >
            <ContentCopyIcon fontSize="small"/>
        </Button>
          {/*</Tooltip>*/}
      </div>

      <img src={data.imageUrl} alt="" className="image__img" />

        <div className="image__footer">
            <a href={data.profileUrl} target="_blank" className="image__footerLeft">
                <Avatar src={data.userImageUrl}>{data.title}</Avatar>
                <h4 className="image__footerLeftName">{data.title}</h4>
            </a>
            {/*<a href={data.downloadUrl} download>*/}
            <Button
                // onClick={downloadImage}
                onClick={downloadFile}
                variant="contained"
                size="small"
                disableElevation
                className="image__button"
                title="Download Photo"
            >
                <ArrowDownwardIcon fontSize="small"/>
            </Button>
            {/*</a>*/}

        </div>
    </div>
  );
}

export default Image;
