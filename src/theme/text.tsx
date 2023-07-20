import styled from "styled-components";
import { Text, TextProps } from "rebass";

const TextWrapper = styled(Text).withConfig({
  shouldForwardProp: (prop) => prop !== "color",
})<{ color: string }>`
  color: ${({ color, theme }) => theme[color] as string};
`;

export function SmallCaption(props: TextProps) {
  return (
    <TextWrapper
      fontWeight={400}
      fontSize={10}
      color={"textPrimary"}
      {...props}
    />
  );
}

export function SmallCaptionBold(props: TextProps) {
  return (
    <TextWrapper
      fontWeight={700}
      fontSize={10}
      color={"textPrimary"}
      {...props}
    />
  );
}

export function Caption(props: TextProps) {
  return (
    <TextWrapper
      fontWeight={300}
      fontSize={12}
      color={"textPrimary"}
      {...props}
    />
  );
}

export function Description(props: TextProps) {
  return (
    <TextWrapper
      fontWeight={400}
      fontSize={12}
      color={"textSecondary"}
      {...props}
    />
  );
}

export function ValidationCaption(props: TextProps) {
  return (
    <TextWrapper
      fontWeight={500}
      fontSize={12}
      color={"textPrimary"}
      {...props}
    />
  );
}

export function BodySmall(props: TextProps) {
  return (
    <TextWrapper
      fontWeight={400}
      fontSize={14}
      color={"textPrimary"}
      {...props}
    />
  );
}

export function SmallSubHeader(props: TextProps) {
  return (
    <TextWrapper
      fontWeight={600}
      fontSize={14}
      color={"textPrimary"}
      {...props}
    />
  );
}

export function SubHeader(props: TextProps) {
  return (
    <TextWrapper
      fontWeight={600}
      fontSize={16}
      color={"textPrimary"}
      {...props}
    />
  );
}

export function MediumHeader(props: TextProps) {
  return (
    <TextWrapper
      fontWeight={600}
      fontSize={20}
      color={"textPrimary"}
      {...props}
    />
  );
}

export function LargeHeader(props: TextProps) {
  return (
    <TextWrapper
      fontWeight={600}
      fontSize={24}
      color={"textPrimary"}
      {...props}
    />
  );
}

export function SmallHeadline(props: TextProps) {
  return (
    <TextWrapper
      fontWeight={700}
      fontSize={24}
      color={"textPrimary"}
      {...props}
    />
  );
}
