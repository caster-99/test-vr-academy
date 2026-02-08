import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports 
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export default function PopularCard({ isLoading, array, title }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;


  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  const currentData = array ? array.slice(page * rowsPerPage, (page + 1) * rowsPerPage) : [];
  const totalPages = array ? Math.ceil(array.length / rowsPerPage) : 0;

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Stack sx={{ gap: gridSpacing }}>
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">{title}</Typography>

              </Stack>

              <Box>
                {currentData.map((item, index) => (
                  <React.Fragment key={index}>
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle1" sx={{ color: 'inherit' }}>
                        {item.name}
                      </Typography>
                      <Stack direction="row" sx={{ alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ color: 'inherit' }}>
                          {item.value || 0}
                        </Typography>
                        <Avatar
                          variant="rounded"
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: '5px',
                            bgcolor: 'success.light',
                            color: 'success.dark',
                            ml: 2
                          }}
                        >
                          <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                        </Avatar>
                      </Stack>
                    </Stack>
                    <Divider sx={{ my: 1.5 }} />
                  </React.Fragment>
                ))}
              </Box>
            </Stack>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" onClick={handlePrev} disabled={page === 0}>
              <IconChevronLeft fontSize="small" color="#000" />
            </Button>
            <Typography variant="body2" sx={{ mx: 2 }}>
              {page + 1} / {totalPages}
            </Typography>
            <Button size="small" onClick={handleNext} disabled={page >= totalPages - 1}>
              <IconChevronRight color="#000" fontSize="small" />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
}

PopularCard.propTypes = { isLoading: PropTypes.bool };
