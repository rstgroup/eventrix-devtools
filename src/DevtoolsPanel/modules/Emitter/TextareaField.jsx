import React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {Stack, styled} from '@mui/material';

const StyledTextarea = styled(TextareaAutosize)(
    ({ theme, error }) => {
        const hasError = error === 'true';
        return`
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.body1.fontSize};
    font-weight: ${theme.typography.fontWeightRegular};
    line-height: 1.5;
    padding: ${theme.spacing(1.5)};
    border-radius: ${theme.shape.borderRadius}px;
    color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900]};
    background: transparent;
    border: 1px solid ${
            theme.palette.mode === 'dark' ?
                hasError ? theme.palette.error.main : theme.palette.grey[700] :
                hasError ? theme.palette.error.main : theme.palette.grey[300]
        };
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]};
  
    &:hover {
      border-color: ${hasError ? theme.palette.error.main : theme.palette.grey[700]};
    }
  
    &:focus {
      border-color: ${hasError ? theme.palette.error.main : theme.palette.primary.main};
      border-width: 2px;
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `},
);

const StyledLabel = styled('label')(
    ({ theme, error }) => {
        const hasError = error === 'true';
        return`
    width: fit-content;
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.body2.fontSize};
    font-weight: ${theme.typography.fontWeightRegular};
    line-height: 1.5;
    padding: ${theme.spacing(0.5)};
    border-radius: ${theme.shape.borderRadius}px;
    color: ${hasError ?  theme.palette.error.main : theme.palette.text.secondary};
    margin-bottom: ${theme.spacing(-3)} !important;
    margin-left: ${theme.spacing(1)} !important;
    background: ${theme.palette.background.paper};
    z-index: 1;
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `},
)

const TextareaField = ({
    name,
    required = false,
    label,
    placeholder = '',
    type = "text",
    defaultValue = "",
    inputProps = {},
    onChange = () => {},
    value = '',
    ...restProps
}) => {
    return (
        <Stack spacing={1}>
            {!!label &&
                <StyledLabel>
                    {required ? '*' : ''}{label}
                </StyledLabel>
            }
            <StyledTextarea
                placeholder={placeholder ? placeholder : undefined}
                onChange={onChange}
                value={value}
                minRows={3}
                sx={{ marginTop: 0 }}
                {...restProps}
            />
        </Stack>
    );
};

export default TextareaField;
